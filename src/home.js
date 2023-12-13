const loginLink = document.querySelector('a')
const youreLoggedInParagraph = document.createElement('p')
youreLoggedInParagraph.innerText = "You're now logged in!"

loginLink.addEventListener('click', e => {
  loginLink.remove()
  document.body.appendChild(youreLoggedInParagraph)
})
