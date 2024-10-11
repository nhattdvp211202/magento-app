import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TestimonialList = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get('http://localhost.magento.com/rest/V1/testimonial', {
          headers: {
            Authorization: 'Bearer eyJraWQiOiIxIiwiYWxnIjoiSFMyNTYifQ.eyJ1aWQiOjEsInV0eXBpZCI6MiwiaWF0IjoxNzI4NjMzMzUyLCJleHAiOjE3Mjg2MzY5NTJ9.eW4DLyumaQGzi2uirOGjz9fBVJjVwRKu9886vokZnwc',
          },
        });
        setTestimonials(response.data);
      } catch (error) {
        console.error('Error fetching testimonials', error);
        setError('Failed to load testimonials. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  },);

  if (loading) {
    return <div>Loading testimonials...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <ul>
        {testimonials.length > 0 ? (
          testimonials.map((testimonial) => (
            <li key={testimonial.id}>
              <p>Name: <strong>{testimonial.name}</strong></p>
              <p>Email: {testimonial.email}</p>
              <p>Message: {testimonial.message}</p>
              <p>Company: {testimonial.company}</p>
              <p>Rating: {testimonial.rating}</p>
              <p>Status: {testimonial.status}</p>
            </li>
          ))
        ) : (
          <li>No testimonials available.</li>
        )}
      </ul>
    </div>
  );
};

export default TestimonialList;
