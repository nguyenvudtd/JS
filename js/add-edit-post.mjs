import utils from "./utils.js";
import postApi from './api/postApi.js';
// const mode = ''; //global
// {
//     const a = ''; // block scope
// }
// MAIN LOGIC

const randomNumber = () => {
    // random range: 100-2000
    const temp = Math.trunc(Math.random() * (2000 - 100));

    return 100 + temp;


}
const getPostFormValues = () => {
    return {
        title: utils.getValueByElementId('postTitle'),
        author: utils.getValueByElementId('postAuthor'),
        description: utils.getValueByElementId('postDescription'),
        imageUrl: utils.getBackgroundImageByElementId('postHeroImage'),
    }
}
const getPostEditFormValues = () => {
    const params = new URLSearchParams(window.location.search);

    const postId = params.get('postId'); //postId

    return {
        id: postId,
        title: utils.getValueByElementId('postTitle'),
        author: utils.getValueByElementId('postAuthor'),
        description: utils.getValueByElementId('postDescription'),
        imageUrl: utils.getBackgroundImageByElementId('postHeroImage'),
    }
}
const validatePostForm = (formValues) => {
    let isValid = true;
    // check title empty 
    if (formValues.title.trim() === '') {
        isValid = false;

        utils.addClassByElementId('postTitle', ['is-invalid']);
    }
    // check author empty
    if (formValues.author.trim() === '') {
        isValid = false;

        utils.addClassByElementId('postAuthor', ['is-invalid']);
    }
    // return class is-invalid


    // console.log(formValue);

    // addClassByElementId
    return isValid;
}
const resetValidationErrors = () => {
    //
    utils.removeClassByElementId('postTitle', ['is-invalid'])
    utils.removeClassByElementId('postAuthor', ['is-invalid'])
}

const handlePostFormSubmit = async (e) => {

    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const postId = params.get('postId'); //postId
    const mode = postId ? 'edit' : 'add';
    // reset Validation errors
    resetValidationErrors();
    //Get form values
    let formValues
    if (mode === 'add') {
        formValues = getPostFormValues();
    }
    else {
        formValues = getPostEditFormValues();
    }
    console.log(formValues);

    // validate form values
    //Required: title + author

    const isValid = validatePostForm(formValues)

    if (!isValid) return;
    //Call API to create a new post
    try {



        if (mode === 'add') {
            const post = await postApi.add(formValues);

            //Inform user: post created
            alert('add new post sucessfully');
            //Redirect edit mode
            const editPostUrl = `add-edit-post.html?postId=${post.id}`;
            window.location = editPostUrl;
        }
        else {
            const post = await postApi.update(formValues);

            //Inform user: post created
            alert('Edit post sucessfully');
            //Redirect edit mode
            const editPostUrl = `add-edit-post.html?postId=${post.id}`;
            window.location = editPostUrl;
        }



    } catch (error) {
        alert(`Failed to add new post: ${error}`);
    }


}
const randomBannerImage = () => {
    const randomId = randomNumber();
    const bannerUrl = `https://picsum.photos/id/${randomId}/1368/400`;

    utils.setBackgroundImageByElementId('postHeroImage', bannerUrl);
};

const handleBannerImage = () => {


}

const renderEditPost = (post) => {
    // Set banner image
    utils.setBackgroundImageByElementId('postHeroImage', post.imageUrl)
    // Set title
    utils.setValueByElementId('postTitle', post.title);
    // Tuong duong ham ben duoi
    utils.setValueByElementId('postAuthor', post.author);
    // Set date time
    //const dateString = utils.formatDate(post.createdAt);
    //utils.setTextByElementId('postDetailTimeSpan', dateString)
    // Set description
    utils.setTextByElementId('postDescription', post.description);

    // Add postChangeImage
    const todoChangeImage = document.querySelector('#postChangeImage');
    if (todoChangeImage) {
        todoChangeImage.addEventListener('click', () => randomBannerImage());

    }

};
const renderEditLink = (post) => {
    const editLink = document.querySelector('#goToDetailPageLink');
    if (editLink) {
        editLink.href = `post-detail.html?postId=${post.id}`;
        editLink.innerHTML = '<i class="fas fa-eye"></i> View post detail';
    }
};
const init = async () => {
    // 

    const params = new URLSearchParams(window.location.search);

    const postId = params.get('postId'); //postId

    const mode = postId ? 'edit' : 'add';

    if (mode === 'add') {
        // random banner image
        randomBannerImage();

    } else {
        console.log('Edit');
        //edit mode
        // Fetch post detail by id
        const post = await postApi.getDetail(postId)

        renderEditPost(post);
        //fetch post
        renderEditLink(post);
        //fill data
    }
    //Bind event: form submit + change banner img
    const postForm = document.querySelector('#postForm')
    if (postForm) {
        postForm.addEventListener('submit', handlePostFormSubmit)
    }
    const changePostBannerButton = document.querySelector('#postChangeImage');

    if (changePostBannerButton) {
        changePostBannerButton.addEventListener('click', handleBannerImage);
    }

};
init();

