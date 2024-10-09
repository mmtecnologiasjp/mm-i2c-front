import { Link } from 'react-router-dom';

import { Text } from '~/components/ui/text.tsx';
import { useSSOLoginURL } from '~/hooks/sso';

export function LoginRightPanel() {
  const link = useSSOLoginURL();

  return (
    <div className="text-white w-full lg:w-2/3 flex flex-col justify-center items-center space-y-4 pt-32 lg:pt-3">
      <h3 className="font-bold text-xl w-52 sm:w-72 md:w-96 lg:w-[500px] text-center">
        With your account in mind, click the button below to login with our SSO
      </h3>
      <button className="btn bg-blue-800 hover:bg-blue-900">
        <Link to={link}>
          <h2>Login with SSO</h2>
        </Link>
      </button>
      <div className="w-52 sm:w-72 text-center">
        <Link to={'#'} className="text-blue-500 text-sm hover:text-blue-600">
          Does not have an account yet? Please contact our staff to create one.
        </Link>
      </div>
    </div>
  );
}
