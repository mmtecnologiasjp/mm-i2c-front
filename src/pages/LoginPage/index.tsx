import { AnimatedContainer } from '../../components/AnimatedContainer';
import { LoginLeftPanel } from '../../components/Login/LoginLeftPanel';
import { LoginRightPanel } from '../../components/Login/LoginRightPanel';

export function LoginPage() {
  return (
    <AnimatedContainer>
      <main className="h-screen">
        <div className="h-screen flex flex-col lg:flex-row">
          <LoginLeftPanel />
          <LoginRightPanel />
        </div>
      </main>
    </AnimatedContainer>
  );
}
