const dialog = document.getElementById("publish-dialog");
const showButton = document.getElementById("publish-btn"); //publish-btn
const noButton = document.getElementById("no-btn");
const yesButton = document.getElementById("yes-btn");

if (showButton) {
  showButton.addEventListener("click", () => {
    dialog.showModal(); // showing the dialog
  });
  noButton.addEventListener("click", () => {
    dialog.close();
  });
  yesButton.addEventListener("click", () => {
    alert("You have submitted.");
    dialog.close();
  });
}

const songsList = document.querySelector(".songs-list");

// const hours = [
//   "00:00",
//   "01:00",
//   "02:00",
//   "03:00",
//   "04:00",
//   "05:00",
//   "06:00",
//   "07:00",
//   "08:00",
//   "09:00",
//   "10:00",
//   "11:00",
//   "12:00",
//   "13:00",
//   "14:00",
//   "16:00",
//   "17:00",
//   "18:00",
//   "19:00",
//   "20:00",
//   "21:00",
//   "22:00",
//   "23:00",
// ];
// const months = [
//   "January",
//   "Febuary",
//   "March",
//   "April",
//   "May",
//   "June",
//   " July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];
// const song1 = {
//   image: "images/vagabond.jpg",
//   audio:
//     "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3",
//   name: "Galaxy Invader",
//   artist: "Water Law",
//   duration: "1:11",
// };

// const song2 = {
//   image: "images/kelsier.jpg",
//   audio:
//     "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3",
//   name: "Kelsier Invader",
//   artist: "Kelsier Law",
//   duration: "1:11",
// };

// const timeSlots = [
//   {
//     day: 16,
//     month: 9, // October (10 - 1)
//     year: 2023,
//     startHour: 12,
//     endHour: 13,
//     totalSongs: 21,
//     song: song1,
//   },
//   {
//     day: 16,
//     month: 9, // October (10 - 1)
//     year: 2023,
//     startHour: 13,
//     endHour: 14,
//     totalSongs: 7,
//     song: song2,
//   },
//   {
//     day: 16,
//     month: 9, // October (10 - 1)
//     year: 2023,
//     startHour: 14,
//     endHour: 15,
//     totalSongs: 5,
//     song: song1,
//   },
// ];

// const songListDate = document.querySelector(".date-playlist");
// const songListDateP = songListDate.querySelector(".customHr");

// function renderDate(list) {
//   songListDateP.innerText = `${list.day} ${months[list.month]} ${list.year} ${
//     hours[list.startHour]
//   } to ${hours[list.endHour]}`;
// }

// function createSongItem(song) {
//   const div = document.createElement("div");
//   div.classList.add("songs-item");

//   const img = document.createElement("img");
//   img.src = song.image;
//   img.alt = "Logo";

//   const ul = document.createElement("ul");
//   const li1 = document.createElement("li");
//   li1.style.color = "antiquewhite";
//   li1.innerHTML = "<b>" + song.name + "</b>";
//   const li2 = document.createElement("li");
//   li2.textContent = song.artist;
//   const li3 = document.createElement("li");
//   li3.textContent = song.duration;

//   const p = document.createElement("p");
//   p.classList.add("editSong");
//   p.textContent = "edit";

//   const button = document.createElement("button");
//   button.type = "button";
//   button.innerHTML = '<i class="fa-solid fa-play"></i>';

//   const span = document.createElement("span");
//   span.classList.add("time");
//   span.textContent = song.duration;

//   ul.appendChild(li1);
//   ul.appendChild(li2);
//   ul.appendChild(li3);

//   div.appendChild(img);
//   div.appendChild(ul);
//   div.appendChild(p);
//   div.appendChild(button);
//   div.appendChild(span);

//   return div;
// }

// function renderList(length, song) {
//   songsList.innerHTML = ""; // Clear the list

//   // Create a document fragment to hold the new items
//   const fragment = document.createDocumentFragment();

//   // Add new items to the fragment
//   for (let i = 0; i < length; i++) {
//     let item = createSongItem(song);
//     fragment.appendChild(item);
//   }

//   // Append the fragment to the list
//   songsList.appendChild(fragment);
// }

// var count = 0;
// // Function to update the content based on the current index
// function updateContent(index) {
//   renderDate(timeSlots[index]);
//   renderList(timeSlots[index].totalSongs, timeSlots[index].song);
//   editListener( timeSlots[index].song);
// }

// // Initialize the content
// updateContent(count);


// const songListDateButton = songListDate.querySelectorAll("button");
// songListDateButton.forEach((btn) => {
//   btn.addEventListener("click", () => {
//     // start at listsongs
//     if (btn.classList.contains("fa-chevron-right")) {
//       count++;
//     } else {
//       count--;
//     }
//     if (count >= 0 && count <= 2) {
//       updateContent(count);
//       renderAudio();
//     } else {
//       window.alert("You do not have any more playlist!");
//       if (count < 0) count++;
//       else count--;
//     }
//   });
// });



                      
function renderAudio() {
  const songsItem = document.querySelectorAll(".songs-item");
  const audio = document.querySelector("audio");
  const audioSource = audio.querySelector("source");
  let currentPlayingSong = null;

  songsItem.forEach((item) => {
    let btn = item.querySelector("button");
    btn.addEventListener("click", () => {
      let icon = btn.querySelector("i");
      if (icon.classList.contains("fa-play")) {
        let active = document.querySelector(".songs-item-active");
        if (active) {
          let btnActive = active.querySelector("button");
          let iconActive = btnActive.querySelector("i");
          iconActive.classList.remove("fa-pause");
          iconActive.classList.add("fa-play");
          active.classList.remove("songs-item-active");
        }
        icon.classList.remove("fa-play");
        icon.classList.add("fa-pause");
        item.classList.add("songs-item-active");

        audioSource.src = timeSlots[count].song.audio; // Replace 'song.audio' with your desired audio source
        audio.load(); // Load the new source
        audio.play(); // Play the audio
      } else {
        icon.classList.remove("fa-pause");
        icon.classList.add("fa-play");
        item.classList.remove("songs-item-active");
        audio.pause();
      }
    });
  });
}

renderAudio();
//editSong
function editListener(song) {
  const showEdit = document.querySelectorAll(".editSong");


  showEdit.forEach((editBtn, index) => {
    const editSongDialog = document.getElementById("editSongDialog");
    const editSongForm = document.getElementById("editSongForm");

    // Get the form input fields
    const editImage = document.getElementById("editImage");
    const editAudio = document.getElementById("editAudio");
    const editName = document.getElementById("editName");
    const editArtist = document.getElementById("editArtist");
    const editDuration = document.getElementById("editDuration");

    // Get the edit button and cancel button for this specific edit element
    const editSongButton = editSongForm.querySelector("#editSongButton");
    const cancelEditButton = editSongForm.querySelector("#cancelEditButton");

    editBtn.addEventListener("click", () => {
        // Populate the form fields with the existing song data
        editImage.value = song.image;
        editAudio.value = song.audio;
        editName.value = song.name;
        editArtist.value = song.artist;
        editDuration.value = song.duration;
        // Show the edit dialog
        editSongDialog.showModal(); // showing the dialog
    });

    editSongButton.addEventListener("click", () => {
      // Validation: Check if any of the fields are empty
      // if (
      //   editImage.value.trim() === "" ||
      //   editAudio.value.trim() === "" ||
      //   editName.value.trim() === "" ||
      //   editArtist.value.trim() === "" ||
      //   editDuration.value.trim() === ""
      // ) {
      //   alert("All fields must be filled out.");
      //   return;
      // }

      song.image = editImage.value;
      song.audio = editAudio.value;
      song.name = editName.value;
      song.artist = editArtist.value;
      song.duration = editDuration.value;
      updateContent(count);
      editSongDialog.close();
    });
    cancelEditButton.addEventListener("click", () => {
      editSongDialog.close();
    });
  });
}
