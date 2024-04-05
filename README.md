# study-stack

### Git Workflow

0. If first time working on the repo, git clone main branch from git to local machine
```
git clone https://github.com/mothras-cloud-solutions/study-stack
```

1. Optional: Make sure you are working from latest version of main
   - Note: alternative is to keep working from the most recent version of your feature branch, but this could lead to more conflicts to resolve when you eventually make pull request to merge into main
```
git checkout main
git pull origin main
```
2. Create or checkout branch for feature you will be working on - DO NOT WRITE CODE DIRECTLY IN MAIN BRANCH
```
git checkout -b <new-feature-branch>
```
or
```
git checkout <feature-branch>
```
3. Optional: Merge main branch into your working branch, and resolve any conflicts in your branch
   - if there are merge conflicts and you do not accept incoming changes only, consider submitting a pull request to make these changes in main before moving forward (see steps 5 to 11)
```
git merge main
```
4. Work/write code in feature branch until ready to submit to main
   - this could include creating or using any number of different branches and merging or rebasing commitsinto your feature branch

5. Make sure all you have added and committed all files that you want to include in your feature branch
```
git add <file-name-1> <file-name-2> <...>
git commit
```
6. Pull latest version of main, merge into your feature branch and resolve any conflicts
   - see steps 1-3

7. Push your feature branch commits to your feature branch in github
```
git push origin <feature-branch>
```
8. In Github, [make pull request (PR)](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request) to main from your feature branch

9. Code review from at least one teammate will be required
   - Make sure your Trello user story and implementation cards are linked from the pull request, and that the implementation task is in the Staged for Review section of Trello
   - Any teammate can pick up a code review, and should join the Trello card and make a comment that they will be reviewing in the pull request to avoid duplication of effort by reviewers
   - If you want review from a specific teammate or from multiple teammates, coordinate with them directly and make this clear in the pull request so that other teammates do not review and/or complete the merge before the
   - Code reviews will generally be completed async

10. Address any feedback received by updating, committing and pushing code to github in your feature branch, or responding to reviewer questions as applicable
    - make sure to update the pull request so that the reviewer knows to review again

11. Resolve any merge conflicts if indicated in github, once code review is completed, commit and push your feature branch to Github
    - see steps 1-3

12. Complete the merge using the magical green button that will now show in the github pull request

13. Take a minute to celebrate your win, and then rinse and repeat

Additional Notes:
- Minimize conflicts and disruption of large code reviews by submitting PRs early and often
- That is not a license to break the site, verify that the page is still rendering correctly/without errors and no tests that were previously passing are failing at each stage of the pull request process, including after making changes based on code review and after resolving conflicts
- Mistakes could happen, teammates will seek to be forgiving if rollback of main to earlier version of git is necessary