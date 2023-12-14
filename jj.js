document.addEventListener("DOMContentLoaded", function() {
    var modals = document.querySelectorAll('.modal');

    modals.forEach(function(modal) {
        var timeButtons = modal.querySelectorAll('.time-button');                
        
        function updateSeatSelection(timeButtonText, modal) {
            var seatSelectionContainer = modal.querySelector('.seat-selection-container');
            var seatSelectionHeader = seatSelectionContainer.querySelector('h3');
            var seatsContainer = modal.querySelector('.seats-container');
            var totalTickets = getTotalTickets(modal); // Function to get the total number of tickets selected
            var selectedSeats = 0;
        
            if (seatSelectionHeader) {
                seatSelectionHeader.textContent = 'Select Your Seats ' + timeButtonText;
            }
        
            seatsContainer.innerHTML = '';
        
            var totalSeats = parseInt(timeButtonText.split('/')[1]);
            var activeSeats = parseInt(timeButtonText.split(' ')[1].split('/')[0]);
            var seatStates = new Array(totalSeats).fill(false); // Array to hold the state of each seat (active/inactive)
            for (let i = 0; i < totalSeats; i++) {
                let seatButton = document.createElement('button');
            // Randomly set activeSeats number of seats to active (true)
            for (let i = 0; i < activeSeats; i++) {
                let index;
                do {
                    index = Math.floor(Math.random() * totalSeats);
                } while (seatStates[index]); // Ensure we don't overwrite an already active seat
                seatStates[index] = true;
            }
            for (let i = 0; i < totalSeats; i++) {
                let seatButton = document.createElement('button');
                if (seatStates[i]) {
                    // Active seats
                    seatButton.addEventListener('click', function() {
                        if (selectedSeats < totalTickets) {
                            if (!this.classList.contains('selected')) {
                                this.classList.add('selected');
                                selectedSeats++;
                            } else {
                                this.classList.remove('selected');
                                selectedSeats--;
                            }
                        } else if (this.classList.contains('selected')) {
                            this.classList.remove('selected');
                            selectedSeats--;
                        }
                    });
                }
        
                seatsContainer.appendChild(seatButton);
            }
        
            // ... existing code ...
        }
        
        // Function to calculate the total number of tickets selected
        function getTotalTickets(modal) {
            var adultTickets = parseInt(modal.querySelector('#adults').value);
            var childrenTickets = parseInt(modal.querySelector('#children').value);
            var seniorTickets = parseInt(modal.querySelector('#seniors').value);
            var studentTickets = parseInt(modal.querySelector('#students').value);
            var wheelchairTickets = parseInt(modal.querySelector('#wheelchair').value);
            return adultTickets + childrenTickets + seniorTickets + studentTickets + wheelchairTickets;
        }
        
            // Calculate the number of rows
            const seatsPerRow = 20;
            const numberOfRows = Math.ceil(totalSeats / seatsPerRow);
        
            // Create row labels and seat buttons
            for (let row = 0; row < numberOfRows; row++) {
                // Create row label
                let rowLabel = document.createElement('div');
                rowLabel.className = 'row-label';
                rowLabel.textContent = 'Row ' + (row + 1);
                seatsContainer.appendChild(rowLabel);
        
                // Create seat buttons for this row
                for (let seat = 0; seat < seatsPerRow; seat++) {
                    let seatIndex = row * seatsPerRow + seat;
                    if (seatIndex < totalSeats) {
                        let seatButton = document.createElement('button');
                        let isActive = seatStates[seatIndex];
                        seatButton.className = isActive ? 'seat-button active' : 'seat-button inactive';
                        seatButton.textContent = 'Seat ' + (seat + 1); // Numbering from 1 to 20 for each row
                        if (!isActive) {
                            seatButton.disabled = true; // Disable button if it's inactive
                        }
                        seatsContainer.appendChild(seatButton);
                    }
                }
            }
        
            seatSelectionContainer.style.display = 'flex';
        }
        
        timeButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                var timeButtonText = button.textContent.trim();
                updateSeatSelection(timeButtonText, modal);
            });
        });
    });
});