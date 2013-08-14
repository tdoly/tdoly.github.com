---
layout: post
title: 图文并茂的git学习教程（一）
category: gits
tagline: 
tags: [gits]
---

## Git 教程
学习Git将会是一个还算艰巨的任务。Git's过多的命令及其分布式特性让许多新用户望而却步，但是这并不要紧。
Atlassian's Git教程提供了一个平易近人的Git版本控制的概论，不仅解释了Git命令的基本原理，而且涉及到的命令都对应你现在SVN的工作流程（如果你现在在用SVN）。

![gitIntroduce][gitIntroduce]

## 1.Git Basics
如果你以前从未使用过Git，那就从这里开始吧。Git基础教程向您展示了如何配置您安装的Git，设置一个新的仓库，并使用基本Git工作流来记录修订你的项目。
[Learn more git basics]

![gitBasics][gitBasics]

## 2.Undoing Changes(撤销改变)
能够记录历史文件却不能恢复到旧版本的软件项目也是没用的。本章节介绍了如何查看旧的提交，恢复文件包含的更改，和复位未提交的改变。

![undoingchanges][undoingchanges]

## 3.Git分支
在一个仓库中一个项目有多个版本，那么分支是一种可靠的，安全的工作方式。本章节讨论Git和SVN分支模型之间的差异，向你展示了如何创建、查看和合并独立的开发线。

![gitbranches][gitbranches]

## 4.重写Git的历史文件
Git提供了很大的灵活性当你需要重写你的项目的历史,但是这可能会导致一些危险的情况。本章节，
我们将学习如何清理老而旧的提交，而不失去快照或破坏Git的协作工作流。

![Rewriting Git History][Rewriting Git History]

## 5.远程仓库
Git的与远程仓库的通信能力为Git所有的协作工作流程打下了很好的基础。本章节，涵盖了基本的移动，提交命令在不同的存储库之间。

![remote Rep][remote Rep]

## 参考资料
[gitTutorial][gitTutorial]

[gitTutorial]: https://www.atlassian.com/git

[gitIntroduce]: https://www.atlassian.com/wac/landing/git/tutorial/pageSections/0/contentColumnTwo/0/imageBinary/git_tutorials.png "gitIntroduce"
[gitBasics]: https://www.atlassian.com/wac/landing/git/tutorial/pageSections/00/pageSections/0/contentColumnTwo/0/imageBinary/git_training-basics.png "gitBasics"
[undoingchanges]: https://www.atlassian.com/wac/landing/git/tutorial/pageSections/00/pageSections/00/contentColumnTwo/0/imageBinary/git-training-undoing-changes.png "Undoing Changes"
[gitbranches]: https://www.atlassian.com/wac/landing/git/tutorial/pageSections/00/pageSections/01/contentColumnTwo/0/imageBinary/git-tutorial-branching-merge-1.png "Git Branches"
[Rewriting Git History]: https://www.atlassian.com/wac/landing/git/tutorial/pageSections/00/pageSections/02/contentColumnTwo/0/imageBinary/git-tutorial-rewriting-history-1.png: "Rewriting Git History"
[remote Rep]: https://www.atlassian.com/wac/landing/git/tutorial/pageSections/00/pageSections/03/contentColumnTwo/0/imageBinary/git-training-remote-repositories-1.png "remote Rep"

[Learn more git basics]: /gits/2013/08/08/git-tutorials-basics