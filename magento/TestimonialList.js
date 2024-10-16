import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TestimonialList.css';

const TestimonialList = ({ token }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [totalTestimonials, setTotalTestimonials] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get('http://localhost.magento.com/rest/V1/testimonial', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTestimonials(response.data);
        setTotalTestimonials(response.data.length);
      } catch (error) {
        console.error('Error fetching testimonials', error);
        setError('Failed to load testimonials. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [token]);

  const imageUrl = (image) => {
    return `http://localhost.magento.com/media/testimonial/image/${image}`;
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentTestimonials = testimonials.slice(indexOfFirstPost, indexOfLastPost);

  // Thay đổi trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(totalTestimonials / postsPerPage);

  if (loading) {
    return <div>Loading testimonials...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Testimonials</h2>
      {currentTestimonials.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Company</th>
              <th>Rating</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {currentTestimonials.map((testimonial) => (
              <tr key={testimonial.id}>
                <td>{testimonial.name}</td>
                <td>{testimonial.email}</td>
                <td>{testimonial.message}</td>
                <td>{testimonial.company}</td>
                <td>{testimonial.rating}</td>
                <td className='image'>
                  {testimonial.image ? (
                    <img
                      src={imageUrl(testimonial.image)}
                      alt={testimonial.image}
                      className="testimonial-image"
                    />
                  ) : (
                    'No image available'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No testimonials available.</p>
      )}

      {/* Phân trang */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TestimonialList;
