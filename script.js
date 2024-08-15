const issueInputForm = document.getElementById('issueInputForm');
issueInputForm.addEventListener('submit', saveIssue);



function saveIssue(e){
//Getting issue details
const issueDesc = document.querySelector('#issueDescInput').value;
const issueSeverity = document.querySelector('#issueSeverityInput').value;
const issueAssignedTo = document.querySelector('#issueAssignedToInput').value;
let issueStatus = 'Open'
let issueId = chance.guid(); 

let issue = {
    id: issueId,
    description: issueDesc,
    severity: issueSeverity,
    assignedTo: issueAssignedTo,
    status: issueStatus
}

    pushIssue(issue);
    issueInputForm.reset();
    getIssues();
}


//  let issues=[];
//  localStorage.setItem('issues', JSON.stringify(issues));
getIssues();

function pushIssue(issue){
    if(localStorage.getItem('issues') == null){
        let issues=[];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }else {
        let issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }
}

function getIssues(){
    let issues = JSON.parse(localStorage.getItem('issues'));
    const issueList = document.querySelector('#issueList');
    
    issueList.innerHTML = '';
    for(let i = 0; i<issues.length; i++){

        const issueWrapper = document.createElement('div');
        issueWrapper.classList.add('issueWrapper', 'bg-gray-300', 'p-7', 'mb-5');
        issueWrapper.innerHTML = `
                <h6 class="mb-4">Issue ID: ${issues[i].id}</h6>
                <div class="${(issues[i].status === 'Open')? 'bg-blue-500' : 'bg-orange-700'} px-2 w-fit rounded text-white mb-8">${issues[i].status}</div>
                <h3 class="text-4xl font-bold mb-3">${issues[i].description}</h3>
                <div class="flex mb-2 ml-1" ><img src="/images/clock.png" class= "w-5 h-5 mt-2" ><p class="text-2xl ml-2">${issues[i].severity}</p></div>
                <div class="flex mb-8" ><img src="/images/user.png" class= "w-7 h-7 mt-0" ><p class="text-2xl ml-2">${issues[i].assignedTo}</p></div>
                <a href="#" class="bg-orange-700 text-white p-3 rounded mr-2 ${(issues[i].status === 'Closed')? 'hidden' : ''}" onclick = "setStatusClosed(${i})">Close</a>
                <a href="#" class="bg-red-700 text-white p-3 rounded" onclick = "deleteIssue(${i})">Delete</a>
        
        `
        issueList.appendChild(issueWrapper);
    }
}

function setStatusClosed(i){
    let issues = JSON.parse(localStorage.getItem('issues'));
    issues[i].status = 'Closed'
    localStorage.setItem('issues', JSON.stringify(issues));
    getIssues();
}

function deleteIssue(i){
    let issues = JSON.parse(localStorage.getItem('issues'));
    delete issues[i];

    var filtered = issues.filter((el) => {
        return el != null;
      });
      
    localStorage.setItem('issues', JSON.stringify(filtered));
    getIssues();
}

