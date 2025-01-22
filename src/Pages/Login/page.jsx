import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Logo from "../../assets/Chief.jpg";
import Google from "../../assets/Google.jsx";
import { useAuth } from "@/contexts/authContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updatePassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
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
  const [ResetSuccess, setResetSuccess] = useState(false);

  const { currentUser } = useAuth();
  const navigate = useNavigate();


  const syncUserToDatabase = async (userData) => {
    try {
      console.log("Attempting to sync user data:", userData);
      
      const response = await fetch('http://localhost:5050/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to sync user data');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error syncing user data:', error);
      throw error;
    }
};

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  
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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      console.log("Firebase user created:", userCredential.user);
      
      const userData = {
        uid: userCredential.user.uid, 
        email: email,
        name: name || email.split('@')[0],
        created_at: new Date().toISOString()
      };
      
      console.log("Sending user data to backend:", userData);
      
      const response = await fetch('http://localhost:5050/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create user');
      }
      
      navigate("/HomePage");
    } catch (err) {
      console.error("Signup error:", err);
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
      provider.addScope('profile');
      provider.addScope('email');
      
      const result = await signInWithPopup(auth, provider);

      if (!result.user || !result.user.uid) {
        throw new Error('Failed to get user information from Google sign in');
      }
      
      await syncUserToDatabase({
        uid: result.user.uid, 
        email: result.user.email,
        name: result.user.displayName || result.user.email.split('@')[0],
        created_at: new Date().toISOString()
      });
      
      navigate("/HomePage");
    } catch (err) {
      console.error('Google sign in error:', err);
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
      <motion.div 
        className="grid md:grid-cols-2 grid-cols-1 bg-white w-full max-w-4xl rounded-lg shadow-lg"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div 
          className="flex justify-center items-center p-4 md:p-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={Logo}
            alt="Logo"
            className="w-48 h-48 md:w-96 md:h-96 object-contain"
          />
        </motion.div>

        <div className="w-full p-4 md:p-10">
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {currentUser && !showChangePassword ? (
              <motion.div
                className="flex flex-col items-center space-y-4 h-[400px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h2 className="text-xl font-bold">Welcome, {currentUser.email}</h2>
                <Button onClick={() => setShowChangePassword(true)}>
                  Change Password
                </Button>
              </motion.div>
            ) : showChangePassword ? (
              <motion.div
                className="flex flex-col items-center space-y-4 h-[400px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
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
              </motion.div>
            ) : showForgotPassword ? (
              <motion.form
                onSubmit={handleForgotPassword}
                className="mt-4 flex flex-col items-center h-[400px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="w-full max-w-md space-y-4">
                  <h2 className="text-xl font-bold text-center">Reset Password</h2>
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-gray-700 px-1">Email</div>
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
              </motion.form>
            ) : (
              <Tabs
                defaultValue="Signup"
                className="w-full"
                onValueChange={setActiveTab}
              >
                <motion.div 
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <FontAwesomeIcon
                    icon={activeTab === "Signup" ? faUser : faRightToBracket}
                    className="w-12 h-12 md:w-16 md:h-16 text-blue-600 mt-4 hidden md:block"
                  />
                  <h1 className="text-xl md:text-3xl font-bold mt-2 text-center">
                    {activeTab === "Signup" ? "Create an account" : "Welcome"}
                  </h1>
                </motion.div>

                <div className="mt-4 flex justify-center">
                  <TabsList className="bg-white">
                    <TabsTrigger 
                      value="Signup"
                      className="w-44 data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
                    >
                      Sign Up
                    </TabsTrigger>
                    <TabsTrigger 
                      value="Login"
                      className="w-44 data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
                    >
                      Login
                    </TabsTrigger>
                  </TabsList>
                </div>

                <AnimatePresence mode="wait">
                  <TabsContent value="Signup" className="mt-0">
                    <motion.form
                      onSubmit={handleSignUp}
                      className="mt-4 flex flex-col items-center h-[400px]"
                      initial="enter"
                      animate="center"
                      exit="exit"
                      variants={slideVariants}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-full max-w-md space-y-4">
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-gray-700 px-1">Name</div>
                          <Input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full h-10 bg-white"
                            required
                          />
                        </div>

                        <div className="space-y-1">
                          <div className="text-sm font-medium text-gray-700 px-1">Email</div>
                          <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-10 bg-white"
                            required
                          />
                        </div>

                        <div className="space-y-1">
                          <div className="text-sm font-medium text-gray-700 px-1">Password</div>
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
                          className="w-full bg-blue-600 text-lg md:text-xl mt-4"
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
                    </motion.form>
                  </TabsContent>

                  <TabsContent value="Login" className="mt-0">
                    <motion.form
                      onSubmit={handleLogin}
                      className="mt-4 flex flex-col items-center h-[400px]"
                      initial="enter"
                      animate="center"
                      exit="exit"
                      variants={slideVariants}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-full max-w-md space-y-4">
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-gray-700 px-1">Email</div>
                          <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-10 bg-white"
                            required
                          />
                        </div>

                        <div className="space-y-1">
                          <div className="text-sm font-medium text-gray-700 px-1">Password</div>
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
                    </motion.form>
                  </TabsContent>
                </AnimatePresence>
              </Tabs>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;