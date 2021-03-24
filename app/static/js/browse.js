var page = 1;

function bindButtons() {
  $('div.btn-join, .btn-joined').on('click', function() {
    $(this).attr('disabled', true);
    $(this).addClass('disableClick');

    setTimeout(() => {
      this.innerText == "Join" ? joinRoom(this.parentNode)
            : leaveRoom(this.parentNode);
    }, 250);
  });
}

function joinRoom(parent) {
    var room = parent.children[0].innerText;
    socket.emit('user_join_room', { room : room });
    updateRoom(room, parent);
}

function leaveRoom(parent) {
    var room = parent.children[0].innerText;
    socket.emit('user_leave_room', { room : room });
    updateRoom(room, parent);
}

function updateRoom(room, parent) {
  $.ajax({
    type: 'POST',
    url: '/update_room',
    data: { room : room }
  }).done(function(data) {
      if (parent.children[3].classList.contains('btn-join') == true) {
        parent.children[3].textContent = 'Joined';
        parent.children[3].classList.add('btn-joined');
        parent.children[3].classList.remove('btn-join');
        
      } else {
        parent.children[3].textContent = 'Join';
        parent.children[3].classList.add('btn-join');
        parent.children[3].classList.remove('btn-joined');
      }
      parent.children[2].textContent = data['members'] + '/5000';
      parent.children[3].removeAttribute('disabled');
      parent.children[3].classList.remove('disableClick');
  });
}

function updateRooms() {
  $.ajax({
    type: 'POST',
    url: '/update_rooms',
    data: { page : page },
  }).done(function(data) { 
      console.log(data);
      ($(`div[data-number=${page}] > div`)).each(function(index) {
        for (let i = 0; i < data[0].length; i++) {
          if (data[0][i][2] == ((index+1) * page)) {
            $(this).children('div.btn-join').text('Joined');
            $(this).children('div.btn-join').addClass('btn-joined');
            $(this).children('div.btn-join').removeClass('btn-join');
          }
          $(this).children('div.room-memb').text(data[1][index] + '/5000');
        } 
      });
      page++;
      joinRoom();
      leaveRoom();
  });
}

window.onload = function() {
  bindButtons();
}