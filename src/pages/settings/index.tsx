import { GetServerSideProps, NextPage } from "next";
import Cookies from "universal-cookie";
import { ME } from "../../gql";
import { me } from "../../gql/__generated__/me";
import { AuthClient } from "../../utils/AuthClient";
import { ChangeNameForm } from "../../components/ChangeNameForm";
import { ChangePasswordForm } from "../../components/ChangePasswordForm";

const Settings: NextPage<{ user: me["me"] }> = ({ user }) => {
  return (
    <div className="container mx-auto h-full flex flex-col p-6">
      <div className="rounded-md bg-white h-full text-gray-800 p-4">
        <div className="w-full border-b-2 h-10 text-2xl font-semibold">
          Settings Page
        </div>
        <div className="flex flex-row gap-10 justify-evenly pt-20">
          <div>
            <div className="font-semibold text-center text-lg">Update Name</div>
            <ChangeNameForm user={user} />
          </div>
          <div>
            <div className="font-semibold text-center text-lg">
              Change Password
            </div>

            <ChangePasswordForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookies = new Cookies(req.headers.cookie);
  const accessToken = cookies.get("accessToken");
  if (accessToken) {
    const client = AuthClient(accessToken);
    const user = await client.query<me>({
      query: ME,
    });
    return {
      props: {
        user: user.data.me,
      },
    };
  }
  return {
    props: {},
    redirect: {
      destination: "/login",
    },
  };
};
