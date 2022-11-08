const allReadButton: HTMLButtonElement | null = document.querySelector(".notifications__all-read-toggler");
const counter: HTMLSpanElement | null = document.querySelector("#notifications__unread-counter");
let unreadPosts: NodeListOf<HTMLLIElement> | null = document.querySelectorAll('.notification__item[data-read="false"]');
const messagePosts: NodeListOf<HTMLLIElement> = document.querySelectorAll('.notification__item[data-type="message-received"]');
const closeModalButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll(".modal__close-button");

const readPostHandler: Function = (unreadPost: HTMLDivElement) => {
	const postTitle: HTMLTitleElement | null = unreadPost.querySelector(".notification__title");

	unreadPost.removeAttribute("tabindex");
	unreadPost.dataset.read = "true";
	if (postTitle) {
		postTitle.dataset.read = "true";
	}
};

const updateCount: Function = () => {
	unreadPosts = document.querySelectorAll('.notification__item[data-read="false"]');

	if (counter) {
		counter.innerHTML = unreadPosts.length ? `${unreadPosts.length.toString()} <span class="sr-only">unread notifications</span>` : "";
		if (unreadPosts.length != 0) {
			counter.hidden = false;
			counter.innerHTML = `${unreadPosts.length.toString()} <span class="sr-only">unread notifications</span>`;
		} else {
			counter.hidden = true;
			counter.innerHTML = "";
		}
	}
};

unreadPosts.forEach((unreadPost) => {
	unreadPost?.addEventListener("click", () => {
		readPostHandler(unreadPost);
		updateCount();
	});
});

allReadButton?.addEventListener("click", () => {
	unreadPosts?.forEach((unreadPost) => readPostHandler(unreadPost));
	updateCount();
});

messagePosts.forEach((messagePost) => {
	messagePost?.addEventListener("click", () => {
		const messageModal: HTMLDialogElement | null = document.querySelector(`#${messagePost.dataset.modal}`);
		messageModal?.showModal();
	});
});

closeModalButtons.forEach((closeModalButton) => {
	closeModalButton?.addEventListener("click", () => {
		const openedModal: HTMLDialogElement | null = document.querySelector(".modal[open]");
		openedModal?.close();
	});
});

updateCount();

export {};
