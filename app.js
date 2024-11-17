
var backgroundImg;

function submitPost() {
	var postTitle = document.getElementById('post-title');
	var postDescription = document.getElementById('postdescrib');
	var time = new Date().toLocaleString();

	var posts = document.getElementById('posts');
	if (postTitle.value.trim() && postDescription.value.trim()) {
		Swal.fire({
			position: 'center',
			icon: 'success',
			title: 'Post has been created',
			showConfirmButton: false,
			timer: 1500,
		});
		setTimeout(function () {
			posts.innerHTML += `
				<div class="card mt-3">
					<div class="card-header fontStyle">
						@Posts
					</div>
					<p class="ps-3">${time}</p>
					<div class="card-body position-relative" style="background-image:url('${backgroundImg || ''}'); background-size: cover; background-repeat: no-repeat; background-position: center; min-height: 150px;">
						<div class="overlay"></div>
						<h5 class="card-title fontStyle">${postTitle.value}</h5>
						<p class="card-text fontStyle">${postDescription.value}</p>
					</div>
					<div class="mt-3 d-flex gap-2 p-3">
						<button type="button" class="btn btn-primary" onclick="editPost(event)">Edit</button>
						<button type="button" class="btn btn-danger" onclick="deletePost(event)">Delete</button>
					</div>
				</div>
			`;

			postTitle.value = '';
			postDescription.value = '';
			backgroundImg = ''; // Reset background image after posting
		}, 1500);
	} else {
		Swal.fire({
			title: 'No input data',
			text: 'Fill some data',
			icon: 'warning',
		});
	}
}

function selectImg(url) {
	backgroundImg = url;
	var images = document.getElementsByClassName('bg-img');
	for (var i = 0; i < images.length; i++) {
		images[i].classList.remove('image-list-selected');
	}
	event.target.classList.add('image-list-selected');
}

async function editPost(event) {
	var cardBody = event.target.closest('.card').querySelector('.card-body');
	var titleElement = cardBody.querySelector('.card-title');
	var descElement = cardBody.querySelector('.card-text');
	const { value: formValues } = await Swal.fire({
		title: 'Update Post',
		html: `
			<label>
				Title
				<input id="swal-input1" class="swal2-input" value="${titleElement.innerHTML}">
			</label>
			<label>
				Description
				<input id="swal-input2" class="swal2-input" value="${descElement.innerHTML}">
			</label>
		`,
		focusConfirm: false,
		preConfirm: () => {
			return [
				document.getElementById('swal-input1').value,
				document.getElementById('swal-input2').value,
			];
		},
	});

	if (formValues) {
		titleElement.innerHTML = formValues[0];
		descElement.innerHTML = formValues[1];
		Swal.fire({
			position: 'center',
			icon: 'success',
			title: 'Post has been updated',
			showConfirmButton: false,
			timer: 1500,
		});
	}
}

function deletePost(event) {
	Swal.fire({
		title: 'Do you want to delete the post?',
		showDenyButton: true,
		confirmButtonText: 'YES',
		denyButtonText: `NO`,
	}).then((result) => {
		if (result.isConfirmed) {
			event.target.closest('.card').remove();
		}
	});
}
