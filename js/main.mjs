'use strict';
import AppConstants from './appConstants.js';
import postApi from './api/postApi.js';
import utils from './utils.js';


// ----- LEARNING ----

const getPostList = () => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  };

  return fetch('https://js-post-api.herokuapp.com/api/posts', options)
    .then(response => {
      // console.log(response);

      if (response.status >= 200 && response.status < 300) {
        // response.json().then(data => console.log(data));
        return response.json();
      }
    });
};

// getPostList().then(data => console.log(data));

// async function abc() {}

const getPostListAsync = async () => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  };

  const response = await fetch('https://js-post-api.herokuapp.com/api/posts', options)
  if (response.status >= 200 && response.status < 300) {
    // response.json().then(data => console.log(data));
    const data = await response.json();
    return data;
  }
};

const getPostDetail = async (postId) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  };

  const url = `${AppConstants.API_URL}/posts/${postId}`;
  const response = await fetch(url, options);
  if (response.status >= 200 && response.status < 300) {
    // response.json().then(data => console.log(data));
    const data = await response.json();
    return data;
  }
};

const updatePost = async (post) => {
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post),
  };

  const url = `${AppConstants.API_URL}/posts/${post.id}`;
  const response = await fetch(url, options);
  if (response.status >= 200 && response.status < 300) {
    // response.json().then(data => console.log(data));
    const data = await response.json();
    return data;
  }
};
///========================================================

const handleTodoEdit = (todo, todoElement) => {
  // console.log('Edit ne');
  // const editPostUrl = `add-edit-post.html?postId=${post.id}`;
  // window.location = editPostUrl;
  const editPostUrl = `add-edit-post.html?postId=${todo.id}`;
  window.location = editPostUrl;
};

const handleTodoDelete = async (todo, todoElement) => {
  // Confirm user to delete
  const confirmMessage = `Are you sure to delete "${todo.title}"`;
  if (window.confirm(confirmMessage)) {
    console.log('Delete todo: ', todo, todoElement);
    // TODO: Remove todo from todo list

    // Remove element from UI
    //todoElement.remove();
    const post = await postApi.remove(todo.id);
  }
};
const handleTodoPostDetail = async (todo, todoElement) => {

  const postDetailUrl = `post-detail.html?postId=${todo.id}`;
  window.location = postDetailUrl;
};
const buildTodoItem = (todo) => {
  // Find todo item template  
  const todoItemTemplate = document.querySelector('#postItemTemplate');
  if (!todoItemTemplate) return null;

  // Clone template
  const todoItemFragment = todoItemTemplate.content.cloneNode(true);
  //console.log(todoItemFragment);

  // Fill data: 
  // - Update li data-todo-id
  const todoElement = todoItemFragment.querySelector('li');
  if (todoElement) {
    todoElement.setAttribute('id', todo.id.toString());
    todoElement.setAttribute('style', 'opacity: 0;');
  }
  // Update todo image
  const todoImgElement = todoItemFragment.querySelector('#postItemImage');
  if (todoImgElement) {

    todoImgElement.setAttribute('src', todo.imageUrl); //height = "508" width = "200"
    todoImgElement.setAttribute('height', AppConstants.DEFAULT_IMAGE_ITEM_HEIGHT);
    todoImgElement.setAttribute('width', AppConstants.DEFAULT_IMAGE_ITEM_WIDTH);
    todoImgElement.removeAttribute('id');
    todoImgElement.addEventListener('click', () => handleTodoPostDetail(todo, todoElement));
  }
  // - Update todo Description
  const todoDescriptionElement = todoItemFragment.querySelector('#postItemDescription');

  if (todoDescriptionElement) {
    todoDescriptionElement.innerText = utils.truncateTextlength(todo.description, AppConstants.DEFAULT_DESCRIPTION_LENGTH);
    todoDescriptionElement.removeAttribute('id');
  }
  // - Update todo title
  const todoTitleElement = todoItemFragment.querySelector('#postItemTitle');

  if (todoTitleElement) {
    todoTitleElement.innerText = todo.title;
    todoTitleElement.removeAttribute('id');
  }
  // - Update todo Author
  const todoAuthorElement = todoItemFragment.querySelector('#postItemAuthor');

  if (todoAuthorElement) {
    todoAuthorElement.innerText = todo.author;
    todoAuthorElement.removeAttribute('id');
  }

  // - Update todo Time
  const todoTimeElement = todoItemFragment.querySelector('#postItemTimeSpan');

  if (todoTimeElement) {
    todoTimeElement.innerText = `- ${utils.formatDate(todo.updatedAt)}`;
    todoTimeElement.removeAttribute('id');
  }
  // console.log(todoElement);

  // Add events
  const todoEditElement = todoElement.querySelector('#postItemEdit');
  if (todoEditElement) {
    todoEditElement.addEventListener('click', () => handleTodoEdit(todo, todoElement));


    //todoEditElement.href = `add-edit-post.html?postId=${todo.id}`;
    //const params = new URLSearchParams(window.location.search);
    //console.log(params);
    //alert(todoEditElement.href)
    // todoEditElement.removeAttribute('id');
  }

  const todoDeleteElement = todoElement.querySelector('#postItemRemove');
  if (todoDeleteElement) {
    todoDeleteElement.addEventListener(
      'click',
      () => handleTodoDelete(todo, todoElement)
    );
    /// todoDeleteElement.removeAttribute('id');
  }

  // Return element
  return todoElement;
}



const renderTodoList = (todoList) => {
  // Validate
  // - Must be an array
  // - Find out ul element
  if (!Array.isArray(todoList)) return;

  const todoListElement = document.querySelector('#postsList');
  if (!todoListElement) return;

  for (const todo of todoList) {
    // Build todo item element
    const todoItemElement = buildTodoItem(todo);

    // Add to ul element
    todoListElement.appendChild(todoItemElement);
  }
};

// -----------------------
// MAIN LOGIC
// -----------------------
const init = async () => {
  try {

    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Tao loading
    let divSpinner = document.querySelector('#spinner');
    let div1 = document.createElement("div");
    div1.setAttribute('id', 'divId1'); // added line
    divSpinner.appendChild(div1);
    utils.addClassByElementId('divId1', ['text-center']);
    //div1.removeAttribute('id');

    let div2 = document.createElement("div");
    div2.setAttribute('id', 'divId2'); // added line
    //style="width: 10rem; height: 10rem; color: red;" role="status"
    div2.setAttribute('style', 'width: 10rem; height: 10rem; color: red;" role="status"');
    div1.appendChild(div2);
    utils.addClassByElementId('divId2', ['spinner-border']);

    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Render loading
    //postsList
    let li = document.querySelectorAll('#postsList > li');
    let listLength = li.length;

    for (let i = listLength - 1; i >= 0; i--) {
      li[i].parentNode.removeChild(li[i]);
    }
    //?_page=2&_limit=6
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    const params = new URLSearchParams(window.location.search);
    const postPage = params.get('_page'); //postId
    const postLimit = params.get('_limit'); //postId
    /// kiem tra lan dau, lan sau
    const mode = postPage ? 'next' : 'first';
    console.log('postPage: ', postPage)
    console.log('postLimit: ', postLimit)
    let totalRows = 0
    let totalPage = 0
    let totalPageSurplus = 0
    let limitRow = 6
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    if (mode == 'first') {
      const postList = await postApi.getPage(`?_sort=updatedAt&_order=desc&_page=1&_limit=${limitRow}`);
      totalRows = postList.pagination._totalRows

      console.log(postList);
      let Data = postList.data
      console.log(Data);
      renderTodoList(Data);
    }
    else {
      const postList = await postApi.getPage(`?_sort=updatedAt&_order=desc&_page=${postPage}&_limit=${postLimit}`);
      totalRows = postList.pagination._totalRows

      console.log(postList);
      let Data = postList.data
      console.log(Data);
      renderTodoList(Data);
    }


    if (totalRows > 0) {
      totalPage = Math.trunc(totalRows / limitRow)
      totalPageSurplus = totalRows % limitRow
    }
    console.log('totalRows: ', totalRows);
    console.log('totalPage: ', totalPage);
    console.log('totalPageSurplus: ', totalPageSurplus);
    ///+++++++++++++++++++++++++++++++++++
    const $nodes = document.querySelectorAll('.col-12.col-md-6.col-lg-4')

    const animations = Array.from($nodes).reduce(
      (promise, $el) => promise.then(() =>
        promiseAnime({
          targets: $el,
          opacity: [1],
          scale: 1,
          translateY: [10, 0]
        })
      ),
      Promise.resolve()
    )
    animations.then(() => {
      // Xoa loading
      $("#divId1").remove();
      // const homePostUrl = `index.html?_sort=updatedAt&_order=desc&_limit=6&_page=1`// `add-edit-post.html?postId=${todo.id}`;
      // window.location = homePostUrl;
      console.log('complete')
    })
    // @exah/promise-anime module content:
    const isFn = el => typeof el === 'function'

    function promiseAnime(options, handleIntance) {
      return new Promise(resolve => {
        const { complete } = options

        const animeInstance = anime({
          ...options,
          complete(animation) {

            if (isFn(complete)) complete(animation)
            resolve(animation)

          }
        })

        if (isFn(handleIntance)) handleIntance(animeInstance)
      })
    }

    ///////////////////////////////////////////////////////
    let elementsPagination = document.querySelector('#postsPagination');
    elementsPagination.removeAttribute('hidden')
    //++++++++++++++++++++++++++++++++++++++++++++++++++
    //const buttonPrevious = document.querySelector('#postsPagination>li>a');
    let buttonPrevious = document.querySelector('[aria-label="Previous"]');
    if (buttonPrevious) {
      buttonPrevious.addEventListener('click', () => {
        console.log('Previous')

        const params = new URLSearchParams(window.location.search);

        let postPage = params.get('_page'); //postId
        let postLimit = params.get('_limit'); //postId

        if (postPage == NaN | postLimit == null) {
          postPage = 1
          postLimit = 6
          const nextPostUrl = `index.html?_page=${postPage}&_limit=${postLimit}`;
          window.location = nextPostUrl;
        }
        else {

          if (totalPage > 0 & postPage > 1) {
            postPage = Number.parseInt(postPage) - 1;
          }
          const nextPostUrl = `index.html?_page=${postPage}&_limit=${postLimit}`;
          window.location = nextPostUrl;
        }


      });

    }

    let buttonNext = document.querySelector('[aria-label="Next"]');
    if (buttonNext) {
      buttonNext.addEventListener('click', () => {
        console.log('Next')

        const params = new URLSearchParams(window.location.search);

        let postPage = params.get('_page'); //postId
        let postLimit = params.get('_limit'); //postId
        if (postPage == NaN | postLimit == null) {
          postPage = 2
          postLimit = 6
          const nextPostUrl = `index.html?_page=${postPage}&_limit=${postLimit}`;
          window.location = nextPostUrl;
        }
        else {
          if (totalPage > 0 & postPage < totalPage & totalPageSurplus == 0) {
            postPage = Number.parseInt(postPage) + 1;
          }
          if (totalPage > 0 & postPage < totalPage + 1 & totalPageSurplus > 0) {
            postPage = Number.parseInt(postPage) + 1;
          }
          const nextPostUrl = `index.html?_page=${postPage}&_limit=${postLimit}`;
          window.location = nextPostUrl;
        }


      });

    }
  } catch (error) {
    console.log(error);
  }
};

init();
