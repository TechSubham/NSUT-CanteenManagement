import { useState,useEffect} from "react";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Logo from "../assets/Chief.jpg";
import Google from "../assets/Google.jsx";
import { useAuth } from "@/contexts/authContext";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updatePassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [activeTab, setActiveTab] = useState("account");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);

  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      try {
        navigate("/HomePage");
      } catch (err) {
        console.error("Error during automatic navigation:", err);
        setError("Failed to navigate to the homepage. Please log in again.");
        navigate("/login");
      }
    }
  }, [currentUser, navigate]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/HomePage");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/HomePage");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    try {
      await signOut(auth);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/HomePage");
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePasswordChange = async () => {
    try {
      setError("");
      setLoading(true);
      await updatePassword(auth.currentUser, newPassword);
      setShowChangePassword(false);
      setNewPassword("");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await sendPasswordResetEmail(auth, resetEmail);
      setResetSuccess(true);
      setShowForgotPassword(false);
      alert("Password reset email sent! Please check your inbox.");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center p-4">
      <div className="grid md:grid-cols-2 grid-cols-1 bg-white w-full max-w-4xl rounded-lg shadow-lg">
        <div className="flex justify-center items-center p-4 md:p-10">
          <img
            src={Logo}
            alt="Logo"
            className="w-48 h-48 md:w-96 md:h-96 object-contain"
          />
        </div>

        <div className="w-full p-4 md:p-10">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {currentUser && !showChangePassword ? (
            <div className="flex flex-col items-center space-y-4">
              <h2 className="text-xl font-bold">
                Welcome, {currentUser.email}
              </h2>
              <Button onClick={() => setShowChangePassword(true)}>
                Change Password
              </Button>
            </div>
          ) : showChangePassword ? (
            <div className="flex flex-col items-center space-y-4">
              <h2 className="text-xl font-bold">Change Password</h2>
              <Input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full max-w-md"
              />
              <div className="flex space-x-2">
                <Button onClick={handlePasswordChange} disabled={loading}>
                  Update Password
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowChangePassword(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : showForgotPassword ? (
            <form
              onSubmit={handleForgotPassword}
              className="mt-4 flex flex-col items-center"
            >
              <div className="w-full max-w-md space-y-4">
                <h2 className="text-xl font-bold text-center">
                  Reset Password
                </h2>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-gray-700 px-1">
                    Email
                  </div>
                  <Input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="w-full h-10 bg-white"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-green-600 text-lg md:text-xl mt-4"
                  disabled={loading}
                >
                  Send Reset Link
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => setShowForgotPassword(false)}
                >
                  Back to Login
                </Button>
              </div>
            </form>
          ) : (
            <Tabs
              defaultValue="account"
              className="w-full"
              onValueChange={setActiveTab}
            >
              <div className="flex flex-col items-center">
                <FontAwesomeIcon
                  icon={activeTab === "account" ? faUser : faRightToBracket}
                  className="w-12 h-12 md:w-16 md:h-16 text-blue-600 mt-4 hidden md:block"
                />
                <h1 className="text-xl md:text-3xl font-bold mt-2 text-center">
                  {activeTab === "account" ? "Create an account" : "Welcome"}
                </h1>
              </div>

              <div className="mt-4 flex justify-center">
                <TabsList>
                  <TabsTrigger value="account">Sign Up</TabsTrigger>
                  <TabsTrigger value="password">Login</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="account">
                <form
                  onSubmit={handleSignUp}
                  className="mt-4 flex flex-col items-center"
                >
                  <div className="w-full max-w-md space-y-4">
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-gray-700 px-1">
                        Name
                      </div>
                      <Input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full h-10 bg-white"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="text-sm font-medium text-gray-700 px-1">
                        Email
                      </div>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-10 bg-white"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="text-sm font-medium text-gray-700 px-1">
                        Password
                      </div>
                      <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-10 bg-white"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-green-600 text-lg md:text-xl mt-4"
                      disabled={loading}
                    >
                      Create Account
                    </Button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-gray-500">
                          Or continue with
                        </span>
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-2"
                      onClick={handleGoogleSignIn}
                      disabled={loading}
                    >
                      <Google />
                      Google
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="password">
                <form
                  onSubmit={handleLogin}
                  className="mt-4 flex flex-col items-center"
                >
                  <div className="w-full max-w-md space-y-4">
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-gray-700 px-1">
                        Email
                      </div>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-10 bg-white"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="text-sm font-medium text-gray-700 px-1">
                        Password
                      </div>
                      <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-10 bg-white"
                        required
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button
                        type="button"
                        variant="link"
                        className="text-sm text-blue-600"
                        onClick={() => setShowForgotPassword(true)}
                      >
                        Forgot Password?
                      </Button>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-green-600 text-lg md:text-xl mt-4"
                      disabled={loading}
                    >
                      Login
                    </Button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-gray-500">
                          Or continue with
                        </span>
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-2"
                      onClick={handleGoogleSignIn}
                      disabled={loading}
                    >
                      <Google />
                      Google
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
