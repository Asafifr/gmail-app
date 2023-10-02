import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";

const loggedinUser = {
  email: "user@appsus.com",
  fullname: "Mahatma Appsus",
};

export const emailService = {
  query,
  save,
  remove,
  getById,
  getDefaultFilter,
  getLoggedinUser,
  createDraftEmail,
};

const STORAGE_KEY = "EMAILS";

_createEmails();

async function query(filterBy) {
  let emails = await storageService.query(STORAGE_KEY);

  if (filterBy) {
    let { to, body } = filterBy;
    to = loggedinUser.email;

    emails = emails.filter((email) =>
      email.body.toLowerCase().includes(body.toLowerCase())
    );
  }

  return emails;
}

function getById(id) {
  return storageService.get(STORAGE_KEY, id);
}

function remove(id) {
  return storageService.remove(STORAGE_KEY, id);
}

function save(emailToSave) {
  if (emailToSave.id) {
    return storageService.put(STORAGE_KEY, emailToSave);
  } else {
    return storageService.post(STORAGE_KEY, emailToSave);
  }
}

function getDefaultFilter() {
  return {
    to: loggedinUser.email,
    body: "",
  };
}

function getLoggedinUser() {
  return loggedinUser;
}

function createDraftEmail() {
  return {
    id: null,
    subject: "",
    body: "",
    to: "",
    from: loggedinUser.email,
    isRead: true,
    isStarred: false,
    sentAt: null,
    isDeleted: false,
  };
}

function _createEmails() {
  let emails = utilService.loadFromStorage(STORAGE_KEY);
  if (!emails || !emails.length) {
    emails = [
      {
        id: "e101",
        subject: "Miss you!",
        body: "Would love to catch up sometimes",
        isRead: true,
        isStarred: false,
        sentAt: 1551133930594,
        removedAt: null, //for later use
        from: "momo@momo.com",
        to: "user@appsus.com",
      },
      {
        id: "e102",
        subject: "Hello!",
        body: "Would love to see you sometimes",
        isRead: false,
        isStarred: true,
        sentAt: 1551133930594,
        removedAt: null, //for later use
        from: "momo@momo.com",
        to: "user@appsus.com",
      },
      {
        id: "e103",
        subject: "Google update!",
        body: "Would love to catch up sometimes",
        isRead: false,
        isStarred: false,
        sentAt: 1551133930594,
        removedAt: null, //for later use
        from: "google@momo.com",
        to: "user@appsus.com",
      },
      {
        id: "e104",
        subject: "Hey user!",
        body: "Would love to catch up sometimes Elad!",
        isRead: false,
        isStarred: false,
        sentAt: 1551133930594,
        removedAt: null, //for later use
        from: "momo@momo.com",
        to: "user@appsus.com",
      },
      {
        id: "e105",
        subject: "Contact us!",
        body: "Would love to meet up sometimes",
        isRead: false,
        isStarred: true,
        sentAt: 1551133930594,
        removedAt: null, //for later use
        from: "google@momo.com",
        to: "user@appsus.com",
      },
      {
        id: "e106",
        subject: "PageMaker including",
        body: "When an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        isRead: true,
        isStarred: false,
        sentAt: 1551133930594,
        removedAt: null, //for later use
        from: "apple@momo.com",
        to: "user@appsus.com",
      },
      {
        id: "e107",
        subject: "What is Lorem Ipsum?",
        body: "Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        isRead: false,
        isStarred: true,
        sentAt: "",
        removedAt: null, //for later use
        from: "google@momo.com",
        to: "user@appsus.com",
      },
      {
        id: "e108",
        subject: "Why do we use it",
        body: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
        isRead: false,
        isStarred: true,
        sentAt: 1551133930594,
        removedAt: 1551133930794, //for later use
        from: "google@momo.com",
        to: "user@appsus.com",
      },
      {
        id: "e109",
        subject: "Where can I see you",
        body: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
        isRead: false,
        isStarred: true,
        sentAt: 1551133930594,
        removedAt: null, //for later use
        from: "google@momo.com",
        to: "user@appsus.com",
      },
      {
        id: "e110",
        subject: "This email is for you!",
        body: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
        isRead: false,
        isStarred: true,
        sentAt: 1551133930994,
        removedAt: null, //for later use
        from: "user@appsus.com",
        to: "google@momo.com",
      },
      {
        id: "e111",
        subject: "Leap into electronic",
        body: "When an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        isRead: true,
        isStarred: false,
        sentAt: 1551133930594,
        removedAt: null, //for later use
        from: "apple@momo.com",
        to: "user@appsus.com",
      },
      {
        id: "e112",
        subject: "What is Lorem Ipsum?",
        body: "Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        isRead: false,
        isStarred: true,
        sentAt: "",
        removedAt: null, //for later use
        from: "google@momo.com",
        to: "user@appsus.com",
      },
      {
        id: "e113",
        subject: "Why do we use it",
        body: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
        isRead: false,
        isStarred: true,
        sentAt: 1551133930594,
        removedAt: 1551133930794, //for later use
        from: "google@momo.com",
        to: "user@appsus.com",
      },
      {
        id: "e114",
        subject: "Where can I see you",
        body: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
        isRead: false,
        isStarred: true,
        sentAt: 1551133930594,
        removedAt: null, //for later use
        from: "google@momo.com",
        to: "user@appsus.com",
      },
      {
        id: "e115",
        subject: "This email is for you!",
        body: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
        isRead: false,
        isStarred: true,
        sentAt: 1551133930994,
        removedAt: null, //for later use
        from: "user@appsus.com",
        to: "google@momo.com",
      },
      {
        id: "e116",
        subject: "Internet tend",
        body: "The majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
        isRead: false,
        isStarred: true,
        sentAt: 1551133930594,
        removedAt: null, //for later use
        from: "google@momo.com",
        to: "user@appsus.com",
      },
      {
        id: "e117",
        subject: "Generator",
        body: "Passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
        isRead: false,
        isStarred: true,
        sentAt: 1551133930594,
        removedAt: null, //for later use
        from: "google@momo.com",
        to: "user@appsus.com",
      },
      {
        id: "e118",
        subject: "Non-characteristic words",
        body: "Randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
        isRead: false,
        isStarred: true,
        sentAt: 1551133930594,
        removedAt: null, //for later use
        from: "google@momo.com",
        to: "user@appsus.com",
      },
      {
        id: "e119",
        subject: "You need to be sure",
        body: "You need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
        isRead: false,
        isStarred: true,
        sentAt: 1551133930594,
        removedAt: null, //for later use
        from: "google@momo.com",
        to: "user@appsus.com",
      },
      {
        id: "e120",
        subject: "Always free",
        body: "It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
        isRead: false,
        isStarred: true,
        sentAt: 1551133930594,
        removedAt: null, //for later use
        from: "google@momo.com",
        to: "user@appsus.com",
      },
      {
        id: "e121",
        subject: "It uses a dictionary",
        body: "First true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
        isRead: false,
        isStarred: true,
        sentAt: 1551133930594,
        removedAt: null, //for later use
        from: "google@momo.com",
        to: "user@appsus.com",
      },
      {
        id: "e122",
        subject: "Where can I see you",
        body: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
        isRead: false,
        isStarred: true,
        sentAt: 1551133930594,
        removedAt: null, //for later use
        from: "google@momo.com",
        to: "user@appsus.com",
      },
      {
        id: "e123",
        subject: "This email is for you!",
        body: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
        isRead: false,
        isStarred: true,
        sentAt: 1551133930994,
        removedAt: null, //for later use
        from: "user@appsus.com",
        to: "google@momo.com",
      },
      {
        id: "e124",
        subject: "Internet tend",
        body: "The majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
        isRead: false,
        isStarred: true,
        sentAt: 1551133930594,
        removedAt: null, //for later use
        from: "google@momo.com",
        to: "user@appsus.com",
      },
      {
        id: "e125",
        subject: "Generator",
        body: "Passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
        isRead: false,
        isStarred: true,
        sentAt: 1551133930594,
        removedAt: null, //for later use
        from: "google@momo.com",
        to: "user@appsus.com",
      },
      {
        id: "e126",
        subject: "Non-characteristic words",
        body: "Randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
        isRead: false,
        isStarred: true,
        sentAt: 1551133930594,
        removedAt: null, //for later use
        from: "google@momo.com",
        to: "user@appsus.com",
      },
      {
        id: "e127",
        subject: "You need to be sure",
        body: "You need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
        isRead: false,
        isStarred: true,
        sentAt: 1551133930594,
        removedAt: null, //for later use
        from: "google@momo.com",
        to: "user@appsus.com",
      },
      {
        id: "e128",
        subject: "Always free",
        body: "It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
        isRead: false,
        isStarred: true,
        sentAt: 1551133930594,
        removedAt: null, //for later use
        from: "google@momo.com",
        to: "user@appsus.com",
      },
      {
        id: "e129",
        subject: "It uses a dictionary",
        body: "First true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
        isRead: false,
        isStarred: true,
        sentAt: 1551133930594,
        removedAt: null, //for later use
        from: "google@momo.com",
        to: "user@appsus.com",
      },
    ];
    utilService.saveToStorage(STORAGE_KEY, emails);
  }

  function emailsFilter() {}
}
