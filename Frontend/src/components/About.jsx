import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  aboutContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '60px 0',
    gap: '2rem',
  },
  introTextContainer: {
    whiteSpace: 'pre-wrap',
    fontSize: '1.1rem',
    fontWeight: 400,
    lineHeight: '1.8',
    color: '#333',
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
  },
  introImageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    maxWidth: 280,
    borderRadius: '50%',
    boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
    transition: 'transform 0.3s ease-in-out',
  },
  imageHover: {
    transform: 'scale(1.05)',
  },
};

function About({ header }) {
  const [data, setData] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const parseIntro = (text) => (
    <div style={styles.introTextContainer}>
      <ReactMarkdown children={text} />
    </div>
  );

  useEffect(() => {
    fetch(endpoints.about)
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch();
  }, []);

  return (
    <>
      <Header title={header} />
      <div className="section-content-container">
        <Container>
          {data ? (
            <Fade bottom duration={1000} distance="30px">
              <Row style={styles.aboutContainer}>
                <Col xs={12} md={6}>
                  {parseIntro(data.about)}
                </Col>
                <Col
                  xs={12}
                  md={6}
                  style={styles.introImageContainer}
                >
                  <img
                    src={data?.imageSource}
                    alt="profile"
                    style={{
                      ...styles.image,
                      ...(isHovered ? styles.imageHover : {}),
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  />
                </Col>
              </Row>
            </Fade>
          ) : (
            <FallbackSpinner />
          )}
        </Container>
      </div>
    </>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
