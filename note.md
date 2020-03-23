   for (let i = 0; i < -1; i++) {

      let ul = document.querySelector('#postsList');
      let li = document.createElement("li");
      li.setAttribute('id', 'liId'); // added line
      li.setAttribute('style', 'opacity: 1; transform: scale(1) translateY(0px);'); // added line 
      ul.appendChild(li);
      utils.addClassByElementId('liId', ['col-12', 'col-md-6', 'col-lg-4']);
      li.removeAttribute('id');


      let div = document.createElement('div');
      div.setAttribute('id', 'postItem'); // added line
      li.appendChild(div);
      utils.addClassByElementId('postItem', ['post-item', 'mb-4']);
      //div.removeAttribute('id');
      // <div class="card">
      let divCard = document.createElement('div');
      divCard.setAttribute('id', 'divId'); // added line
      div.appendChild(divCard);
      utils.addClassByElementId('divId', ['card']);
      divCard.removeAttribute('id');
      //  <img src="images/recipe.jpg"

      let img = document.createElement('img');
      img.setAttribute('id', 'postItemImage'); // added line
      img.setAttribute('src', postList[i].imageUrl); //height = "508" width = "200"
      img.setAttribute('height', AppConstants.DEFAULT_IMAGE_ITEM_HEIGHT);
      img.setAttribute('width', AppConstants.DEFAULT_IMAGE_ITEM_WIDTH);
      img.setAttribute('alt', 'recipe');
      //utils.addClassByElementId('postItemImage', ['card-img-top']);
      //img.setAttribute('onerror', `this.onerror=null;this.src='https://picsum.photos/id/580/1368/400';`)// lay tu server imageUrl
      //utils.setBackgroundImageByElementId('imgId', postList[i].imageUrl)
      divCard.appendChild(img);
      //img.removeAttribute('id');


      //<div class="card-body">
      let divCardBody = document.createElement('div');
      divCardBody.setAttribute('id', 'divId'); // added line
      divCard.appendChild(divCardBody);
      utils.addClassByElementId('divId', ['card-body']);
      divCardBody.removeAttribute('id');
      //<h5 class="card-title">Card title</h5>
      let h5 = document.createElement('h5');
      h5.setAttribute('id', 'h5Id'); // added line
      divCardBody.appendChild(h5);
      utils.addClassByElementId('h5Id', ['card-title']);
      utils.setTextByElementId('h5Id', `${postList[i].title}`)// lay tu server title
      h5.removeAttribute('id');

      //<p class="card-text">
      let p = document.createElement('p');
      p.setAttribute('id', 'pId'); // added line
      divCardBody.appendChild(p);
      utils.addClassByElementId('pId', ['card-text']);
      utils.setTextByElementId('pId', utils.truncateTextlength(postList[i].description, AppConstants.DEFAULT_DESCRIPTION_LENGTH))// lay tu server description
      p.removeAttribute('id');
      // <p class="card-text">
      let pp = document.createElement('p');
      pp.setAttribute('id', 'pId'); // added line
      divCardBody.appendChild(pp);
      utils.addClassByElementId('pId', ['card-text']);
      utils.setTextByElementId('pId', '')// lay tu server
      pp.removeAttribute('id');
      //<small class="text-muted">by</small>
      let small1 = document.createElement('small');
      small1.setAttribute('id', 'pId'); // added line
      divCardBody.appendChild(small1);
      utils.addClassByElementId('pId', ['card-text']);
      utils.setTextByElementId('pId', 'by')
      small1.removeAttribute('id');

      //<small class="text-muted font-weight-bold">Hau Nguyen</small>
      let small2 = document.createElement('small');
      small2.setAttribute('id', 'pId'); // added line
      divCardBody.appendChild(small2);
      utils.addClassByElementId('pId', ['text-muted', 'font-weight-bold']);
      utils.setTextByElementId('pId', ` ${postList[i].author} - `)// lay tu server author
      small2.removeAttribute('id');
      //<small class="text-muted">- 3 mins ago</small>
      let small3 = document.createElement('small');
      small3.setAttribute('id', 'pId'); // added line
      divCardBody.appendChild(small3);
      utils.addClassByElementId('pId', ['text-muted']);
      utils.setTextByElementId('pId', utils.formatDate(postList[i].updatedAt))// lay tu server updatedAt
      small3.removeAttribute('id');

      // <div class="post-item-menu">
      //   <div class="menu-item rounded-circle"><i class="fas fa-pen"></i></div>
      //   <div class="menu-item rounded-circle"><i class="fas fa-trash"></i></div>
      // </div>
      let divPostMenu = document.createElement('div');
      divPostMenu.setAttribute('id', 'divId'); // added line
      div.appendChild(divPostMenu);
      utils.addClassByElementId('divId', ['post-item-menu']);
      divPostMenu.removeAttribute('id');
      //  <div class="menu-item rounded-circle"><i class="fas fa-pen"></i></div>
      let divPostItem = document.createElement('div');
      divPostItem.setAttribute('id', 'divId'); // added line
      divPostMenu.appendChild(divPostItem);
      utils.addClassByElementId('divId', ['menu-item', 'rounded-circle']);
      divPostItem.removeAttribute('id');

      let tagI = document.createElement('i');
      tagI.setAttribute('id', 'divId'); // added line
      divPostItem.appendChild(tagI);
      utils.addClassByElementId('divId', ['fas', 'fa-pen']);
      tagI.removeAttribute('id');
      // <div class="menu-item rounded-circle"><i class="fas fa-trash"></i></div>
      divPostItem = document.createElement('div');
      divPostItem.setAttribute('id', 'divId'); // added line
      divPostMenu.appendChild(divPostItem);
      utils.addClassByElementId('divId', ['menu-item', 'rounded-circle']);
      divPostItem.removeAttribute('id');
      tagI = document.createElement('i');
      tagI.setAttribute('id', 'divId'); // added line
      divPostItem.appendChild(tagI);
      utils.addClassByElementId('divId', ['fas', 'fa-trash']);
      tagI.removeAttribute('id');
    }


   // id: "1356b24a-8b63-41dc-9bbe-1bfd5f4a219a"
    // title: "Officia nobis"
    // author: "Nathan Fahey"
    // description: "nam dolor consequuntur consequatur in libero amet esse quibusdam odit sapiente velit et et ab sed voluptatem facere omnis quod exercitationem nesciunt magnam provident aspernatur aut perferendis omnis aperiam eveniet aut rerum amet ut fugit sequi placeat illum error dolores accusantium odio iure quia ipsa dicta labore sed et minus"
    // createdAt: 1558780892525
    // updatedAt: 1558780892525
    // imageUrl: "https://picsum.photos/id/580/1368/400"


       // Data.sort((d1, d2) => new Date(d2.updatedAt).getTime() - new Date(d1.updatedAt).getTime());


           // var elements = document.querySelectorAll('.dom-node-demo .el');

    // anime({
    //   targets: elements,
    //   translateX: 270
    // });


    
    //const postList = await postApi.getAll();
    //?_sort=updatedAt&_order=desc
    //?_limit=10&_page=2