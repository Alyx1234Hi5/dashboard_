const hamburger = document.querySelector("#toggle-btn");

hamburger.addEventListener("click", function(){
    document.querySelector("#sidebar").classList.toggle("expand");
})

//CHARTS
document.addEventListener("DOMContentLoaded", function() {
    //checking the flag from the homepage.js set
    setInterval(function() {
        if (localStorage.getItem("refreshOtherPage") === "true") {
            localStorage.removeItem("refreshOtherPage"); //to clear the flag
            location.reload(); //to refresh the page
        }
    }, 1000);
    
  //DAILY CHART
  fetch('/laundry_system/dashboard/configs_db/daily.php')
  .then(response => response.json())
  .then(data => {
      const ctx = document.getElementById('daychart').getContext('2d');
      const daychart = new Chart(ctx, {
          type: 'bar', 
          data: {
              labels: data.labels,
              datasets: [{
                  label: 'Requests in Day',
                  data: data.data,
                  backgroundColor: data.backgroundColors,
                  borderColor: data.borderColors,
                  borderWidth: 1
              }]
          },
          options: {
              responsive: true,
              plugins: {
                  title: {
                      display: true,
                      text: 'Daily Requests by Service and Category',
                      font: {
                          size: 14 
                      }
                  },
                  legend: {
                      display: true,
                      position: 'top',
                      labels: {
                          font: {
                              size: 12 
                          }
                      }
                  }
              },
              scales: {                                               
                  x: {
                      ticks: {
                          callback: function(value, index, values) {
                              // truncate or shorten labels if they are longer than 15 characters
                              return value.length > 15 ? value.substr(0, 15) + '...' : value;
                          }
                      }
                  },
                  y: {
                      beginAtZero: true
                  }
              }
          }
      });
  })
  .catch(error => console.error('Error fetching chart data:', error));

  //WEEKLY CHART
  fetch('/laundry_system/dashboard/configs_db/weekly.php')
    .then(response => response.json())
    .then(data => {
        const ctx = document.getElementById('weekchart').getContext('2d');
        const weekchart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Weekly Requests by Service and Category',
                    data: data.data,
                    backgroundColor: data.backgroundColors,
                    borderColor: data.borderColors,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            color: '#000',
                            font: {
                                size: 12
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Weekly Requests by Service and Category',
                        font: {
                            size: 14
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                let label = tooltipItem.label || '';
                                let value = tooltipItem.raw || '';
                                return [
                                    `${label}: ${value}`, 
                                    `Requests Count: ${value}` 
                                ];
                            }
                        }
                    }
                }
            }
        });
    })
    .catch(error => console.error('Error fetching chart data:', error));

    //MONTHLY CHART
    fetch('/laundry_system/dashboard/configs_db/monthly.php')
    .then(response => response.json())
    .then(data => {
        console.log('Chart Data:', data); 
        const ctx = document.getElementById('monthchart').getContext('2d');
        const monthchart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Orders in the Month',
                    data: data.data,
                    backgroundColor: data.backgroundColors,
                    borderColor: data.borderColors,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    title: {
                        display: true,
                        text: 'Monthly Requests by Service and Category',
                        font: {
                            size: 14
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                let label = tooltipItem.label || '';
                                let value = tooltipItem.raw || '';
                                return [
                                    `${label}: ${value}`, 
                                    `Requests Count: ${value}`
                                ];
                            }
                        }
                    }
                }
            }
        });
    })
    .catch(error => console.error('Error fetching chart data:', error));

    //YEARLY CHART
    fetch('/laundry_system/dashboard/configs_db/yearly.php')
    .then(response => response.json())
    .then(data => {
        const labels = data.labels;
        const yearData = {
            labels: labels,
            datasets: [{
                label: 'Requests in Year',
                data: data.data,
                backgroundColor: data.backgroundColors,
                borderColor: data.borderColors,
                borderWidth: 5,
                fill: true, 
            }]
        };

        const config = {
            type: 'line',
            data: yearData,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Yearly Requests by Service and Category',
                        font: {
                            size: 14
                        }
                    },
                },
                scales: {
                    x: {
                        ticks: {
                            callback: function(value, index, values) {                                
                                //shorten labels if they are longer than 15 characters
                                return value.length > 15 ? value.substr(0, 15) + '...' : value;
                            }
                        }
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        };

        var yearchart = new Chart(
            document.getElementById('yearchart'),
            config
        );

    })
    .catch(error => console.error('Error fetching chart data:', error));

    // for logout
    const logoutModal = document.getElementById("logoutModal");
    const closeBtn = logoutModal.querySelector(".close");
    const noBtn = logoutModal.querySelector(".btn-no");

   $("#btn_logout").click(function() {
        $('#logoutModal').show();
   });

    // Close the modal when clicking the close button (×)
    if (closeBtn) {
        closeBtn.addEventListener("click", function() {
            logoutModal.style.display = "none"; 
        });
    }

    // Close the modal when clicking the 'No' button
    if (noBtn) {
        noBtn.addEventListener("click", function() {
            logoutModal.style.display = "none"; 
        });
    }

    // Close the modal when clicking outside the modal content
    window.addEventListener("click", function(event) {
        if (event.target === logoutModal) {
            logoutModal.style.display = "none";
        }
    });

// NOTIFICATION MODAL ------ BAGONG CODE


const notificationModal = document.getElementById('notificationModal');
const notificationCount = document.getElementById('notification-count');

// Function to open the modal and populate it with data
function openModal() {
    notificationModal.style.display = 'block';
    notificationCount.innerText = requestCount; // Set the notification count

    let namesList = '';
    if (customerRequests.length > 0) {
        namesList = '<ul>';
        customerRequests.forEach(request => {
            namesList += `
                 <li class="small-font">
        Customer Name: ${request.name}<br>
        Address: ${request.customer_address}<br>
        Price: ${request.price} <br>
        Weight: ${request.weight} kg <br>
        Quantity: ${request.quantity} <br>
        Request Date: ${request.request_date}<br>
        Total Amount: ${request.total_amount}
    </li>
                <hr></hr>
            `;
        });
        namesList += '</ul>';
    } else {
        namesList = '<p>No new delivery requests.</p>';
    }

    document.getElementById('notification-content').innerHTML = namesList;
}

// Function to close the modal
function closeModal() {
    notificationModal.style.display = 'none';
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
    if (event.target === notificationModal) {
        closeModal(); // Hide the modal when clicking outside
    }
};

// Close button inside the modal
const closeModalButton = notificationModal.querySelector(".close");
if (closeModalButton) {
    closeModalButton.addEventListener("click", closeModal); // Close modal when the close button is clicked
}

// Trigger to open the notification modal
document.getElementById("bell-icon").addEventListener("click", openModal);

});
