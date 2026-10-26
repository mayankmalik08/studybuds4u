import React, { useState } from 'react';

export default function PeerStudyMatcherApp() {
  const [studentProfile, setStudentProfile] = useState({
    name: 'Mayank Malik',
    year: '1st Year B.Tech',
    branch: 'Electrical Engineering',
    needsHelpWith: ['Circuit Analysis', 'Python Programming'],
    canTeach: ['Mathematics I', 'Physics'],
    points: 120 // Gamification reputation points
  });

  const [activeView, setActiveView] = useState('hub'); // 'hub' | 'swipe' | 'rooms' | 'profile'
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [activeRooms, setActiveRooms] = useState([
    { id: 1, title: 'Circuit Analysis Mid-Term Prep', host: 'Aarav Sharma', members: 4, topic: 'Thevenin Theorem & AC Circuits' },
    { id: 2, title: 'Python Code & Debugging Jam', host: 'Sneha Rao', members: 3, topic: 'Data Structures & Loops' }
  ]);
  const [notification, setNotification] = useState(null);

  const [peers, setPeers] = useState([
    {
      id: 1,
      name: 'Aarav Sharma',
      year: '2nd Year',
      branch: 'Electrical',
      canTeach: ['Circuit Analysis', 'Vector Calculus'],
      needsHelpWith: ['Data Structures'],
      bio: 'Circuit wizard. Can help you visualize transformer labs and solve complex nodal analysis easily.',
      matchScore: 94
    },
    {
      id: 2,
      name: 'Priya Verma',
      year: '1st Year',
      branch: 'Computer Science',
      canTeach: ['Python Programming', 'Discrete Math'],
      needsHelpWith: ['Circuit Analysis'],
      bio: 'Coding enthusiast looking for a study buddy to tackle electrical engineering basics together.',
      matchScore: 89
    },
    {
      id: 3,
      name: 'Rohan Gupta',
      year: '2nd Year',
      branch: 'Electronics',
      canTeach: ['Analog Electronics', 'Circuit Analysis'],
      needsHelpWith: ['English Communication'],
      bio: 'Passionate about hardware and circuit breadboarding. Let us ace finals together!',
      matchScore: 85
    }
  ]);

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleSwipe = (action) => {
    if (action === 'connect') {
      showToast(`Connection request sent to ${peers[currentCardIndex].name}! Earned +10 Study Points 💡`);
      setStudentProfile(prev => ({ ...prev, points: prev.points + 10 }));
    } else {
      showToast(`Skipped profile.`);
    }
    setCurrentCardIndex((prev) => (prev + 1) % peers.length);
  };

  const joinRoom = (roomTitle) => {
    showToast(`Successfully joined active study room: "${roomTitle}"!`);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Toast */}
      {notification && (
        <div style={{ position: 'fixed', top: '20px', right: '20px', background: '#8b5cf6', color: '#fff', padding: '12px 20px', borderRadius: '12px', fontWeight: '800', zIndex: 1000, boxShadow: '0 10px 25px rgba(139, 92, 246, 0.4)' }}>
          ⚡ {notification}
        </div>
      )}

      {/* Top Navigation Header */}
      <header style={{ background: '#1e1b4b', borderBottom: '1px solid #312e81', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: '#7c3aed', color: '#fff', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10px', fontWeight: '900', fontSize: '18px' }}>S</div>
          <div>
            <h1 style={{ margin: 0, fontSize: '18px', fontWeight: '800', letterSpacing: '-0.5px' }}>StudySync AI</h1>
            <p style={{ margin: 0, fontSize: '11px', color: '#c4b5fd' }}>Peer Collaboration & Skill Swap Hub</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {[
            { id: 'hub', label: '📊 Campus Hub' },
            { id: 'swipe', label: '🔥 Partner Matcher' },
            { id: 'rooms', label: '🎧 Live Study Rooms' },
            { id: 'profile', label: '👤 My Passport' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id)}
              style={{
                background: activeView === tab.id ? '#7c3aed' : '#312e81',
                color: activeView === tab.id ? '#fff' : '#c4b5fd',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '8px',
                fontWeight: '700',
                cursor: 'pointer',
                fontSize: '13px'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      <main style={{ maxWidth: '1000px', margin: '32px auto', padding: '0 20px' }}>

        {/* VIEW 1: CAMPUS HUB OVERVIEW */}
        {activeView === 'hub' && (
          <div>
            {/* Hero Banner */}
            <div style={{ background: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)', borderRadius: '20px', padding: '36px', marginBottom: '28px', boxShadow: '0 10px 30px rgba(124, 58, 237, 0.2)' }}>
              <span style={{ background: '#a78bfa', color: '#2e1065', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase' }}>Smart Campus Protocol</span>
              <h2 style={{ fontSize: '28px', fontWeight: '900', margin: '12px 0 8px 0' }}>Bridge the Gap in First-Year Subjects</h2>
              <p style={{ fontSize: '14px', color: '#ede9fe', maxWidth: '600px', margin: '0 0 20px 0', lineHeight: '1.6' }}>
                Stop struggling alone with Circuit Analysis or Python assignments. Match with senior peers who excel in your weak areas while you teach what you master.
              </p>
              <div style={{ display: 'flex', gap: '16px' }}>
                <button onClick={() => setActiveView('swipe')} style={{ background: '#fff', color: '#4c1d95', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: '800', cursor: 'pointer' }}>
                  Start Matching Now 🚀
                </button>
                <button onClick={() => setActiveView('rooms')} style={{ background: 'transparent', color: '#fff', border: '1px solid #a78bfa', padding: '12px 24px', borderRadius: '10px', fontWeight: '800', cursor: 'pointer' }}>
                  Join Active Rooms (2)
                </button>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              <div style={{ background: '#1e1b4b', border: '1px solid #312e81', padding: '24px', borderRadius: '16px' }}>
                <div style={{ color: '#a78bfa', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase' }}>Your Reputation</div>
                <div style={{ fontSize: '28px', fontWeight: '900', marginTop: '6px' }}>{studentProfile.points} PTS</div>
                <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>Level 2 Peer Mentor</div>
              </div>
              <div style={{ background: '#1e1b4b', border: '1px solid #312e81', padding: '24px', borderRadius: '16px' }}>
                <div style={{ color: '#a78bfa', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase' }}>Active Study Rooms</div>
                <div style={{ fontSize: '28px', fontWeight: '900', marginTop: '6px' }}>2 Live</div>
                <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>Circuit & Python Labs</div>
              </div>
              <div style={{ background: '#1e1b4b', border: '1px solid #312e81', padding: '24px', borderRadius: '16px' }}>
                <div style={{ color: '#a78bfa', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase' }}>Skill Synergy Index</div>
                <div style={{ fontSize: '28px', fontWeight: '900', marginTop: '6px', color: '#34d399' }}>94% Match</div>
                <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>High complementarity</div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: TINDER-STYLE PARTNER MATCHER */}
        {activeView === 'swipe' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px' }}>Smart Peer Swipe Deck</h2>
            <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '24px' }}>Swipe or click below to connect with students who match your learning loop.</p>

            {/* Profile Card */}
            <div style={{ width: '100%', maxWidth: '450px', background: '#1e1b4b', border: '1px solid #4c1d95', borderRadius: '24px', padding: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', textAlign: 'center', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '24px', right: '24px', background: '#7c3aed', color: '#fff', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '900' }}>
                {peers[currentCardIndex].matchScore}% Match
              </div>

              <div style={{ width: '80px', height: '80px', background: '#312e81', borderRadius: '50%', margin: '0 auto 16px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px' }}>
                🎓
              </div>

              <h3 style={{ fontSize: '22px', fontWeight: '800', margin: '0 0 4px 0' }}>{peers[currentCardIndex].name}</h3>
              <p style={{ fontSize: '13px', color: '#a78bfa', margin: '0 0 16px 0', fontWeight: '700' }}>{peers[currentCardIndex].year} • {peers[currentCardIndex].branch} Branch</p>
              
              <p style={{ fontSize: '14px', color: '#cbd5e1', fontStyle: 'italic', background: '#0f172a', padding: '16px', borderRadius: '12px', marginBottom: '20px', border: '1px solid #312e81' }}>
                "{peers[currentCardIndex].bio}"
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '28px', textAlign: 'left', width: '100%' }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#a78bfa', fontWeight: '700', textTransform: 'uppercase' }}>Can Teach</div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#34d399' }}>{peers[currentCardIndex].canTeach.join(', ')}</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#a78bfa', fontWeight: '700', textTransform: 'uppercase' }}>Needs Help</div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#f87171' }}>{peers[currentCardIndex].needsHelpWith.join(', ')}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                <button 
                  onClick={() => handleSwipe('skip')}
                  style={{ flex: 1, background: '#312e81', color: '#f87171', border: '1px solid #4c1d95', padding: '14px', borderRadius: '14px', fontWeight: '800', cursor: 'pointer', fontSize: '14px' }}
                >
                  ✕ Skip
                </button>
                <button 
                  onClick={() => handleSwipe('connect')}
                  style={{ flex: 1, background: '#7c3aed', color: '#fff', border: 'none', padding: '14px', borderRadius: '14px', fontWeight: '800', cursor: 'pointer', fontSize: '14px', boxShadow: '0 4px 15px rgba(124, 58, 237, 0.4)' }}
                >
                  ♥ Connect
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: LIVE STUDY ROOMS */}
        {activeView === 'rooms' && (
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px' }}>Active Virtual Study Rooms</h2>
            <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '24px' }}>Hop into an active peer session right now.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
              {activeRooms.map(room => (
                <div key={room.id} style={{ background: '#1e1b4b', border: '1px solid #312e81', padding: '24px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ background: '#312e81', color: '#a78bfa', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '800' }}>Host: {room.host}</span>
                    <h3 style={{ margin: '10px 0 6px 0', fontSize: '18px', fontWeight: '800' }}>{room.title}</h3>
                    <p style={{ margin: 0, fontSize: '13px', color: '#cbd5e1' }}>Focus: <strong>{room.topic}</strong> &nbsp;|&nbsp; 👥 {room.members} Students in room</p>
                  </div>
                  <button 
                    onClick={() => joinRoom(room.title)}
                    style={{ background: '#7c3aed', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '10px', fontWeight: '800', cursor: 'pointer', fontSize: '13px' }}
                  >
                    Join Room 🎧
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 4: MY STUDENT PASSPORT / PROFILE */}
        {activeView === 'profile' && (
          <div style={{ maxWidth: '600px', margin: '0 auto', background: '#1e1b4b', border: '1px solid #312e81', padding: '36px', borderRadius: '20px' }}>
            <h2 style={{ margin: '0 0 8px 0', fontSize: '22px', fontWeight: '800' }}>My Student Passport</h2>
            <p style={{ margin: '0 0 24px 0', fontSize: '13px', color: '#94a3b8' }}>Manage your skill exchange credentials.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#a78bfa', marginBottom: '6px' }}>Full Name</label>
                <input type="text" value={studentProfile.name} onChange={e => setStudentProfile({...studentProfile, name: e.target.value})} style={{ width: '100%', padding: '12px', background: '#0f172a', border: '1px solid #312e81', borderRadius: '8px', color: '#fff', outline: 'none' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#a78bfa', marginBottom: '6px' }}>Year</label>
                  <input type="text" value={studentProfile.year} onChange={e => setStudentProfile({...studentProfile, year: e.target.value})} style={{ width: '100%', padding: '12px', background: '#0f172a', border: '1px solid #312e81', borderRadius: '8px', color: '#fff', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#a78bfa', marginBottom: '6px' }}>Branch</label>
                  <input type="text" value={studentProfile.branch} onChange={e => setStudentProfile({...studentProfile, branch: e.target.value})} style={{ width: '100%', padding: '12px', background: '#0f172a', border: '1px solid #312e81', borderRadius: '8px', color: '#fff', outline: 'none' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#a78bfa', marginBottom: '6px' }}>Needs Help With</label>
                <input type="text" value={studentProfile.needsHelpWith.join(', ')} onChange={e => setStudentProfile({...studentProfile, needsHelpWith: e.target.value.split(',').map(s=>s.trim())})} style={{ width: '100%', padding: '12px', background: '#0f172a', border: '1px solid #312e81', borderRadius: '8px', color: '#fff', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#a78bfa', marginBottom: '6px' }}>Can Teach</label>
                <input type="text" value={studentProfile.canTeach.join(', ')} onChange={e => setStudentProfile({...studentProfile, canTeach: e.target.value.split(',').map(s=>s.trim())})} style={{ width: '100%', padding: '12px', background: '#0f172a', border: '1px solid #312e81', borderRadius: '8px', color: '#fff', outline: 'none' }} />
              </div>
              <button onClick={() => { setActiveView('hub'); showToast('Passport updated successfully!'); }} style={{ background: '#7c3aed', color: '#fff', border: 'none', padding: '14px', borderRadius: '10px', fontWeight: '800', cursor: 'pointer', marginTop: '10px' }}>
                Save Passport 🛡️
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}