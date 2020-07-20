export const pullRequestsMergedUrl = {
    'react': 'https://api.github.com/search/issues?q=repo:facebook/react+is:pr+is:merged+merged:>',
    'angular': 'https://api.github.com/search/issues?q=repo:angular/angular+is:pr+is:merged+merged:>', 
    'ember': 'https://api.github.com/search/issues?q=repo:emberjs/ember.js+is:pr+is:merged+merged:>', 
    'vue': 'https://api.github.com/search/issues?q=repo:vuejs/vue+is:pr+is:merged+merged:>'
}

export const issuesCreatedUrl = {
    'react': 'https://api.github.com/search/issues?q=repo:facebook/react+is:issue+created:>',
    'angular': 'https://api.github.com/search/issues?q=repo:angular/angular+is:issue+created:>', 
    'ember': 'https://api.github.com/search/issues?q=repo:emberjs/ember.js+is:issue+created:>', 
    'vue' : 'https://api.github.com/search/issues?q=repo:vuejs/vue+is:issue+created:>'
}

export const issuesClosedUrl = {
    'react': 'https://api.github.com/search/issues?q=repo:facebook/react+is:issue+closed:>',
    'angular': 'https://api.github.com/search/issues?q=repo:angular/angular+is:issue+closed:>', 
    'ember': 'https://api.github.com/search/issues?q=repo:emberjs/ember.js+is:issue+closed:>', 
    'vue' : 'https://api.github.com/search/issues?q=repo:vuejs/vue+is:issue+closed:>'
}

export const repoDataUrl = {
    'react': 'https://api.github.com/repos/facebook/react',
    'angular': 'https://api.github.com/repos/angular/angular.js', 
    'ember': 'https://api.github.com/repos/emberjs/ember.js',
    'vue': 'https://api.github.com/repos/vuejs/vue'
}

export const votesAPIUrl = {
    'votes': 'http://localhost:8000/votes/', 
    'castvote': 'http://localhost:8000/castvote/'
}
