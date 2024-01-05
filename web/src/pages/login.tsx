import { Formik, Form } from "formik";
import { useState } from "react";
import { If } from "../core/If";
import { api } from "../services/api";
import { useAuth } from "../state/auth";

export function Login() {

  const [view, setView] = useState('login');
  const login = useAuth(state => state.login);
  return (
    <div className="bg-emerald-500 w-screen h-screen">
      <If test={view === 'login'}>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async (values) => {
          await login(values.email, values.password)
        }}
      >
        {({ handleChange, handleSubmit }) => (
          <Form
            onSubmit={handleSubmit}
            className="flex items-center justify-center w-full h-full"
          >
            <div className="bg-slate-50 w-3/6 h-3/6 rounded-md shadow-lg">
              <div className="h-full flex items-center justify-center flex-col">
                <h2 className="text-2xl">Login</h2>
                <input
                  type="text"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  placeholder="email"
                  className="bg-transparent border border-emerald-500"
                />
                 <input
                  type="text"
                  name="password"
                  id="password"
                  onChange={handleChange}
                  placeholder="password"
                  className="bg-transparent border border-emerald-500"
                />
                <button className="bg-emerald-500 w-3/6 mt-5 p-3 rounded-md text-white">
                  Login
                </button>
                <strong onClick={() => setView('new')}>criar conta</strong>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      </If>
      <If test={view === 'new'}>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        onSubmit={async (values) => {
          const response = api.post('/register', {
            name : values.name,
            email : values.email,
            password : values.password
          })
        }}
      >
        {({ handleChange, handleSubmit }) => (
          <Form
            onSubmit={handleSubmit}
            className="flex items-center justify-center w-full h-full"
          >
            <div className="bg-slate-50 w-3/6 h-3/6 rounded-md shadow shadow-lg">
              <div className="h-full flex items-center justify-center flex-col">
                <h2 className="text-2xl">Create Account</h2>
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={handleChange}
                  placeholder="name"
                  className="bg-transparent border border-emerald-500"
                />
                 <input
                  type="text"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  placeholder="email"
                  className="bg-transparent border border-emerald-500"
                />
                 <input
                  type="text"
                  name="password"
                  id="password"
                  onChange={handleChange}
                  placeholder="password"
                  className="bg-transparent border border-emerald-500"
                />
                <button className="bg-emerald-500 w-3/6 mt-5 p-3 rounded-md text-white" type="submit">
                  Login
                </button>
                <strong onClick={() => setView('login')}>fazer login</strong>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      </If>
    </div>
  );
}
