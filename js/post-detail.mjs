import postApi from './api/postApi.js';
import utils from './utils.js';

const renderPost = (post) => {
  // Set banner image
  utils.setBackgroundImageByElementId('postHeroImage', post.imageUrl)

  $('div.post-content-wrapper').attr('id', 'postContentWrapper');
  let img = document.querySelectorAll('#postContentWrapper> img');
  const listLength = img.length;
  for (var i = listLength - 1; i >= 0; i--) {
    img[i].setAttribute('id', `imgId${i}`); // added line
    const img1 = document.querySelector(`#imgId${i}`);
    if (img1) {
      // console.log(img1.src);
      $(`#imgId${i}`).wrap(`<a  href=${img1.src} data-lightbox=image-${i + 1} data-title="Picsum photos"></a>`);
    }
    img[i].removeAttribute('id');
  }


  // Set title
  // const titleElement = document.querySelector('#postDetailTitle');
  // if (titleElement) {
  //   titleElement.innerText = post.title;
  // }
  utils.setTextByElementId('postDetailTitle', post.title);
  // Set author
  // const authorElement = document.querySelector('#postDetailAuthor');
  // if (authorElement) {
  //   authorElement.innerText = post.author;
  // }
  // Tuong duong ham ben duoi
  utils.setTextByElementId('postDetailAuthor', post.author);
  // Set date time
  const dateString = utils.formatDate(post.createdAt);
  utils.setTextByElementId('postDetailTimeSpan', dateString)
  // Set description
  utils.setTextByElementId('postDetailDescription', post.description);
};

const renderEditLink = (post) => {
  const editLink = document.querySelector('#goToEditPageLink');
  if (editLink) {
    editLink.href = `add-edit-post.html?postId=${post.id}`;
    editLink.innerHTML = '<i class="fas fa-edit"></i> Edit post';
  }
};

// -----------------------
// MAIN LOGIC
// -----------------------
const init = async () => {
  try {
    // Retrieve postId from query params
    const params = new URLSearchParams(window.location.search);
    const postId = params.get('postId');
    if (!postId) return;

    // Fetch post detail by id
    const post = await postApi.getDetail(postId);

    // render post
    renderPost(post);

    // update edit link
    renderEditLink(post);

  } catch (error) {
    console.log(error);
  }
};

init();
