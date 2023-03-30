import React from 'react'
import xebia from '../../Assets/xebia.jpg'
import intel from '../../Assets/intel.jpg'


const IndustryColab = () => {
  return (
    <>
    <div className="container">
    <section className='mt-5' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Industry Collaborations</h2>
      <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
        Our department has a strong commitment to collaborating with industry partners to provide real-world experiences for our students and to stay up-to-date with the latest trends and technologies in the field. Here are some of our current industry collaborations:
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '1rem' }}>
          <img src={xebia} alt="Partner 1" style={{ marginBottom: '1rem',width:'150px' }} />
          <h3 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Xebia</h3>
          <p style={{ textAlign: 'center' }}>At SPSU, we are proud to collaborate with industry leaders like Xebia to provide our students with real-world experiences and cutting-edge education. As part of our partnership, Xebia's industry experts are providing training in machine learning to our students, giving them the skills and knowledge they need to excel in this fast-growing field. We are grateful for the opportunity to work with Xebia and look forward to continued collaboration in the future.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '1rem' }}>
          <img src={intel} alt="Partner 2" style={{ marginBottom: '1rem',width:'150px' }} />
          <h3 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Intel</h3>
          <p style={{ textAlign: 'center' }}>At SPSU, we are honored to partner with Intel, a leading global technology company. Through this partnership, our students have access to Intel's state-of-the-art hardware and software, as well as opportunities to work on cutting-edge research projects. Intel also regularly provides guest lectures and workshops on topics like artificial intelligence, computer architecture, and cybersecurity, giving our students valuable insights into the latest industry trends and technologies. We are grateful for our collaboration with Intel and the many opportunities it provides for our students to grow and succeed.</p>
        </div>
        
      </div>
    </section>
    </div>
    </>
  )
}

export default IndustryColab
