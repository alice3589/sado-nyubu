'use client';

import { Container, Nav, Navbar } from 'react-bootstrap';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const menuItems = [
    { name: 'ホーム', path: '/' },
    { name: '桜の花びら', path: '/cherry-blossom' },
  ];

  return (
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
                className={`nav-link ${pathname === item.path ? 'active' : ''}`}
              >
                {item.name}
              </Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}