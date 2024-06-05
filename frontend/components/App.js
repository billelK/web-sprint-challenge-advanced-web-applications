import React, { useState } from 'react'
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom'
import Articles from './Articles'
import LoginForm from './LoginForm'
import Message from './Message'
import ArticleForm from './ArticleForm'
import Spinner from './Spinner'
import axios from 'axios'


const articlesUrl = 'http://localhost:9000/api/articles'
const loginUrl = 'http://localhost:9000/api/login'

export default function App() {
  // ✨ MVP can be achieved with these states
  const [message, setMessage] = useState('')
  const [articles, setArticles] = useState([])
  const [currentArticleId, setCurrentArticleId] = useState()
  const [spinnerOn, setSpinnerOn] = useState(false)

  // ✨ Research `useNavigate` in React Router v.6
  const navigate = useNavigate()
  const redirectToLogin = () => { /* ✨ implement */ 
    navigate("/")
  }
  const redirectToArticles = () => { /* ✨ implement */ 
  navigate("/articles")
  }

  const logout = () => {
    // ✨ implement
    // If a token is in local storage it should be removed,
    // and a message saying "Goodbye!" should be set in its proper state.
    // In any case, we should redirect the browser back to the login screen,
    // using the helper above.
    localStorage.removeItem("token")
    setMessage("Goodbye!")
    redirectToLogin()
  }

  const login = ({ username, password }) => {
    // ✨ implement
    // We should flush the message state, turn on the spinner
    setMessage("")
    setSpinnerOn(true)
    // and launch a request to the proper endpoint.
    axios.post(loginUrl, 
      {username, password}
    )
    .then(res => {
      setSpinnerOn(false)
      localStorage.setItem("token", res.data.token)
      setMessage(res.data.message)
      redirectToArticles()
    })

    // fetch(loginUrl, {
    //   body: JSON.stringify({username: username, password: password}),
    //   method: "POST",
    //   headers: {"Content-Type": "Application/json"}
    // })
    // .then(res => {
    //   if(!res.ok) {
    //     throw new Error("Ooops Something Went Wrong!...")
    //   }
    //   return res.json()
    // })
    // .then(data=> {
    //   setSpinnerOn(false)
    //   localStorage.setItem("token", data.token)
    //   setMessage(data.message)
    //   redirectToArticles()
    // })
    // .catch(error => console.log(error))
    // On success, we should set the token to local storage in a 'token' key,
    // put the server success message in its proper state, and redirect
    // to the Articles screen. Don't forget to turn off the spinner!

  }

  const getArticles = () => {
    // ✨ implement
    // We should flush the message state, turn on the spinner
    setMessage("")
    setSpinnerOn(true)
    // and launch an authenticated request to the proper endpoint.
    const token = localStorage.getItem("token")
    axios.get("http://localhost:9000/api/articles", {headers: {Authorization: token}})
    .then(res => {
      setSpinnerOn(false)
      setArticles(res.data.articles)
      setMessage(res.data.message)
    })

    // fetch(articlesUrl,
    //   {headers: {Authorization: token}}
    // )
    // .then(res => {
    //   if(!res.ok) {
    //     throw new Error("Ooops Something Went Wrong!...")
    //   }
    //   const contentType = res.headers.get("content-type")
    //   if(contentType.includes("application/json")) {
    //     return res.json()
    //   }
    //   if(res.status === 401){
    //     redirectToLogin()
    //   }
    // })
    // .then(data => {
    //   setSpinnerOn(false)
    //   setArticles(data.articles)
    //   setMessage(data.message)
    // })
    // .catch(error => {
    //   setSpinnerOn(false)
    //   console.log(error)
    // })

    // On success, we should set the articles in their proper state and
    // put the server success message in its proper state.
    // If something goes wrong, check the status of the response:
    // if it's a 401 the token might have gone bad, and we should redirect to login.
    // Don't forget to turn off the spinner!
    
  }

  const postArticle = article => {
    // ✨ implement
    // The flow is very similar to the `getArticles` function.
    // You'll know what to do! Use log statements or breakpoints
    // to inspect the response from the server.

    const token = localStorage.getItem("token")
    setMessage("")
    setSpinnerOn(true)

    axios.post(articlesUrl, article, { headers: { 'Authorization': token } })
      .then(res => {
        setMessage(res.data.message)
        setArticles([...articles, res.data.article]) 
        setSpinnerOn(false)
      })

  //   fetch(articlesUrl,
  //     {
  //       body: JSON.stringify(article),
  //       method: "POST",
  //       headers: {"Content-Type": "Application/json",
  //       Authorization: token
  //       }
  //     }
  //   )
  //   .then(res => {
  //     if(!res.ok) {
  //       throw new Error("Ooops Something Went Wrong!...")
  //     }
  //     return res.json()
  //   })
  //   .then(data => {
  //     setMessage(data.message)
  //     setArticles([...articles, data.article]) 
  //     setSpinnerOn(false)
  //   })
  //   .catch(error => console.log(error))
  }

  const updateArticle = (article_id, article) => {
    // ✨ implement
    const token = localStorage.getItem("token")
    setMessage("")
    setSpinnerOn(true)

    axios.put(`${articlesUrl}/${article_id}`, 
      article, 
      { headers: { 'Authorization': token } })
      .then(res => {
        setMessage(res.data.message)
        const updatedArticles = articles.map(article => {
        if(article.article_id === article_id) return res.data.article
        else return article
      })
        setArticles(updatedArticles)
        setSpinnerOn(false)
      })

    // fetch(`${articlesUrl}/${article_id}`,
    //   {
    //     body: JSON.stringify(article),
    //     method: "PUT",
    //     headers: {"Content-Type": "Application/json",
    //       Authorization: token
    //     }
    //   }
    // )
    // .then(res => {
    //   if(!res.ok) {
    //     throw new Error("Ooops Something Went Wrong!...")
    //   }
    //   return res.json()
    // })
    // .then(data => { 
    //   setMessage(data.message)
    //   const updatedArticles = articles.map(article => {
    //     if(article.article_id === article_id) return data.article
    //     else return article
    //   })
    //   setArticles(updatedArticles)
    //   setSpinnerOn(false)
    // })
    // .catch(error => console.log(error))
    // You got this!
  }

  const deleteArticle = article_id => {
    // ✨ implement
    
    const token = localStorage.getItem("token")
    setMessage("")
    setSpinnerOn(true)

    axios.delete(`${articlesUrl}/${article_id}`,{ headers: { 'Authorization': token } })
      .then(res => {
        setMessage(res.data.message)
        const newArticles = articles.filter(art => art.article_id !== article_id)
        setArticles(newArticles)
        setSpinnerOn(false)
      })

  //   fetch(`${articlesUrl}/${article_id}`,
  //     {
  //       headers: {Authorization : token},
  //       method: "DELETE"
  //     }
  //   )
  //   .then(res => {
  //     if(!res.ok) {
  //       throw new Error("Ooops Something Went Wrong!...")
  //     }
  //     return res.json()
  //   })
  //   .then(data => {
  //     setMessage(data.message)
  //     const newArticles = articles.filter(art => art.article_id !== article_id)
  //     setArticles(newArticles)
  //     setSpinnerOn(false)
  //   })
  //   .catch(error => console.log(error))
  }

  return (
    // ✨ fix the JSX: `Spinner`, `Message`, `LoginForm`, `ArticleForm` and `Articles` expect props ❗
    <>
      <Spinner on={spinnerOn}/>
      <Message message={message}/>
      <button id="logout" onClick={logout}>Logout from app</button>
      <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}> {/* <-- do not change this line */}
        <h1>Advanced Web Applications</h1>
        <nav>
          <NavLink id="loginScreen" to="/">Login</NavLink>
          <NavLink id="articlesScreen" to="/articles">Articles</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<LoginForm login={login}/>} />
          <Route path="articles" element={
            <>
              <ArticleForm postArticle={postArticle} updateArticle={updateArticle} setCurrentArticleId={setCurrentArticleId} currentArticle={articles.find(article => article.article_id === currentArticleId)}/>
              <Articles deleteArticle={deleteArticle} getArticles={getArticles} currentArticleId={currentArticleId} articles={articles} setCurrentArticleId={setCurrentArticleId} />
            </>
          } />
        </Routes>
        <footer>Bloom Institute of Technology 2024</footer>
      </div>
    </>
  )
}
