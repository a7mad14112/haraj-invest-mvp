import Header from './Header';
import Footer from './Footer';
import FloatingActions from './FloatingActions';
import MobileQuickActions from './MobileQuickActions';

export default function Layout({ children, home = false }) {
  return (
    <>
      <Header />
      <div id="main-content">{children}</div>
      <FloatingActions />
      <MobileQuickActions />
      <Footer home={home} />
    </>
  );
}
