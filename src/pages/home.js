import * as React from "react";

const Home = () => {
  return (
    <div style={{textAlign: 'center', paddingTop: '50px'}}>
      <h1 style={{fontSize: '48px', fontWeight: 'bold', marginBottom: '30px'}}>Welcome to Travel Reimbursement Tracker!</h1>
      <p style={{fontSize: '24px', lineHeight: '1.5', marginBottom: '30px'}}>Track your business travel expenses with ease using our application.</p>
      <ul style={{listStyleType: 'none', margin: '0 auto', padding: '0', maxWidth: '500px'}}>
        <li style={{fontSize: '24px', lineHeight: '1.5', marginBottom: '20px', borderBottom: '1px solid #ddd', paddingBottom: '20px'}}>Log your trips and expenses.</li>
        <li style={{fontSize: '24px', lineHeight: '1.5', marginBottom: '20px', borderBottom: '1px solid #ddd', paddingBottom: '20px'}}>Calculate reimbursements based on today's average fuel consumption.</li>
        <li style={{fontSize: '24px', lineHeight: '1.5', marginBottom: '20px', paddingBottom: '20px'}}>Submit reimbursement requests to your manager.</li>
      </ul>
    </div>
  );
};

export default Home;
