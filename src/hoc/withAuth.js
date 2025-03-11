import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/store';

const withAuth = (WrappedComponent) => {
  // Create the wrapped component
  const WithAuthComponent = (props) => {
    const router = useRouter();
    const { token, adminInfo, isAuthenticated, logout } = useAuthStore();

    useEffect(() => {
      if (!token || !adminInfo) {
        logout(); // Clear state if not authenticated
        router.push('/auth');
      }
    }, [token, adminInfo, router, logout]);

    if (!isAuthenticated) {
      return null; // Prevent rendering if not authenticated
    }

    return <WrappedComponent {...props} />;
  };

  // Add display name to the component
  const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithAuthComponent.displayName = `withAuth(${wrappedComponentName})`;
  
  return WithAuthComponent;
};

export default withAuth;