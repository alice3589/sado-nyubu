'use client';

import { Container, Nav, Navbar } from 'react-bootstrap';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const menuItems = [
    { name: 'ホーム', path: '/' },
    { name: '部活動紹介(作成中)', path: '/ActivitySchedule' },
  ];

  return (
    <div className="relative">
      <Navbar bg="light" expand="sm" className="shadow-sm">
        <Container>
          <Link href="/" className="navbar-brand">
            KTC
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`nav-link position-relative ${
                    pathname === item.path ? 'active' : ''
                  }`}
                  style={{
                    borderBottom: pathname === item.path ? '2px solid #0d6efd' : 'none',
                    paddingBottom: '0.5rem',
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}