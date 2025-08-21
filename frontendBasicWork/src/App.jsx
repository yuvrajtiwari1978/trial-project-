import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import AddBlogForm from './components/AddBlogForm'
import ListBlog from './components/ListBlog'
import EditBlogForm from './components/EditBlogForm';
import DeleteBlogForm from './components/deleteBlogForm'
import Register from './components/register';
import Login from './components/login';
import ProtectedRoute from './routes/ProtectedRoute';
import UnProtectedRoute from './routes/UnProtectedRoute';

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<ProtectedRoute />}>
            <Route path='/' element={<ListBlog />} />
            <Route path='myblog' element={<ListBlog />} />
            <Route path='addblog' element={<AddBlogForm />} />
            <Route path='editBlog' element={<EditBlogForm />} />
            <Route path='deleteBlog' element={<DeleteBlogForm />} />
          </Route>
          <Route path='/auth' element={<UnProtectedRoute />}>
            <Route path='register' element={<Register />} />
            <Route path='login' element={<Login />} />
          </Route>
          {/* <Route path='/' element={<h1>Hi home</h1>} />
          <Route path='/myblog' element={<ListBlog />} />
          <Route path='/addblog' element={
            token ? (
              <AddBlogForm />
            ) : (
              <button className="button my-10 p-2 bg-blue-400 text-white">
                Login
              </button>
            )} />
          <Route path='/editBlog/:id' element={<EditBlogForm />} />
          <Route path='/deleteBlog/:id' element={<DeleteBlogForm />} />
          <Route path='/user/register' element={<Register />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

// rfce