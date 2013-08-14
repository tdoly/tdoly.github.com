---
layout: post
title: 图文并茂的git学习教程（二）
category: gits
tagline: Git Basics
tags: [gits]
---

本章节提供了Git许多重要的命令的简洁概述。首先，你需要开始一个新的版本控制项目并设置一个仓库来解释所有的工具。然后，剩下的部分介绍日常的Git命令。
学完这个项目之后，你应该可以建立一个Git仓库，安全的记录你的项目快照，并查看你的项目保存历史。

![basics][basics]

## git init

### The git init Command
使用`git init` 命令建立一个新的Git仓库。它可以用来改变现有的，或者仓库中未受版本控制的项目，或者初始化一个新的空库。大多数的其他Git命令无法在初始化库之外使用，所以当你建立一个新的项目时通常会第一个使用它。
执行`git init` 会在项目的根目录下建立一个名为`.git`的子目录，它包含仓库所有必须的元数据。除了这个多出的`.git`目录，已存在的项目没有什么变化（不像SVN，Git不会在每个子目录下都建立`git`目录）。（CVS跟SVN一样，^-^，还是比较喜欢Git）

### Usage

    git init

将当前目录转变成Git仓库。这增加了一个`.git`文件夹到当前目录，然后就可以开始记录projec修订的项目了。

    git init <directory>

在指定的路径下建立一个空的Git仓库。执行这条命令将创建一个名为`<directory>`包含除了`.git`子目录的新文件夹。

    git init --bare <directory>

初始化一个空的Git仓库，但是忽略掉工作目录。经常使用`--bare`来创建分享仓库（详见下面讨论）。通常，仓库使用`--bare`初始化`.git`结束。例如，有一个裸仓库中叫`my-project`，应该使用`my-project.git`存储目录。

### Discussion

与SVN比较，`git init`命令是一个令人难以置信的简单的方法来创建新的版本控制项目。Git不要求您创建一个仓库，导入文件，Check Out一个工作副本
。所有你必须做的是cd到您的项目文件夹和运行`git init`，那么你就会有一个功能齐全的git仓库。
然而，对于大多数项目，`git init`只需要执行一次创建一个中央仓库----开发人员通常不使用`git init`创建本地仓库。反而，他们通常会使用`git clone`来复制现有的仓库到他们的本地机器。（说的太对了）

### Bare Repositories（裸库？）
`--bare`会建立一个没有工作目录的仓库，这个仓库它不能编辑文件和提交修改。中央仓库应该总是被创建为裸库，因为pushing分支到非裸库有可能发生覆盖。在对立的开发环境中可以将`--bare`标记的库作为一种存储设施。这意味着对于几乎所有Git工作流，中央仓库是裸库，而开发的本地仓库不是裸库。

![bare repo][bare repo]

### Example

由于`git clone `是一个更加方便的方式在本地创建一个项目的副本，所以通常使用`git init`来创建一个中央仓库：

    ssh @
    cd path/above/repo 
    git init --bare my-project.git

首先，你的服务器SSH到将包含您的中央仓库。然后，找到你想存储项目的地方。最后，您可以使用`--bare`来创建一个中央仓库。开发人员可以在他们的开发机上`clone my-project.git`来创建一个本地副本。


## git clone

`git clone` 命令可以复制现有的Git仓库。这有点像`svn checkout`命令，除了“working copy”是一个完整的Git仓库，它有它自己的历史,管理自己的文件,是一个完全孤立于原始库的环境。


### Usag

    git clone <repo>

克隆位于`<repo>`的仓库到本地机器。原来的库可以位于本地文件系统或者是在远程机器上通过HTTP或SSH去访问。


    git clone <repo> <directory>

克隆位于`<repo>`的仓库到本地名叫`<directory>`目录下。


### Discussion

如果一个项目已经被设置在了中央仓库，`git clone`是最常见的方式让用户获取开开发使用的Copy。像`git init`克隆通常是一次性操作
。一旦开发者已获得一个工作副本，所有版本控制的操作和协作方式都需要能在本地仓库中使用。

### Repo-To-Repo Collaboration

重要的是要理解,Git的思想“working copy”是不同于你从一个SVN仓库中check out 一个“working copy”。与SVN不同，Git并不区分“working copy”和中央仓库——他们都是完整的Git仓库。

这就使得Git和SVN的协作方式从根本上有所不同。SVN取决于中央仓库和“working copy”之间的关系，Git的协作模型是基于仓库与仓库之间交互。而不是检查“working copy”到SVN的仓库，你只需`push`或者`pull`提交一个库到另外一个库。

![svn repo][svn repo]

当然,这没有阻止你使用Git仓库的某些特殊意义。例如，可以简单的指定一个Git仓库为中央仓库，这可以让Git使用集中工作流。关键是,这是通过约定使用的而不是VCS本身具有的功能。

### Example

下面的例子演示了如何使用SSH用户名为`john`从存储在服务器为`example.com`的中央仓库获取一个本地副本。

    git clone ssh://john@example.com/path/to/my-project.git 
    cd my-project
    # Start working on the project

第一个命令在您的本地机器`my-project`文件夹中初始化一个新的Git存储库，然后在填充中央仓库的内容。然后你可以`cd`到项目下开始编辑文件，提交快照和其他仓库进行交互。请注意，`.git`是从克隆仓库省略了的。这也反映了本地副本时non-bare的状态（NO裸库）。


## git config

`git config`命令可以让你从命令行配置Git的安装（或者个人仓库）。这个命令可以定义用户在仓库中所有的行为喜好。下面列出几种常见的配置选项。

### Usage

    git config user.name <name>

在当前仓库定义一个作者姓名来使用所有的提交。通常，你希望使用`--global`标签来为当前用户设置配置选项。

    git config --global user.name <name>

定义一个作者姓名来让这个用户能是有所有的提交命令。

    git config --global user.email <email>

定义一个作者邮箱来让这个用户能是有所有的提交命令。

    git config --global alias.<alias-name> <git-command>

为Git命令创建一个快捷方式

    git config --system.core.editor <editor>

定义一个文本编辑器让当前机器上的所有用户来使用像`git commit`这样的命令。这个`<editor>`命令就是来启动设置的那个编辑器的参数（例如：vi）。

    git config --global --edit

打开全局配置文件在一个文本编辑器手动编辑。

### Discussion

　　所有的配置选项都存储在纯文本文件中,因此`git config`配置命令实际上只是一个方便的命令行界面。通常,只需要你第一次在使用的新开发机配置一个Git安装,以及几乎所有情况下,您会希望使用`--global`标签。
 　Git存储配置选项在三个独立的文件中,它可以让你选择范围,用户,每个仓库或整个系统:
 * repo /.git/config 仓库具体的位置
 * /.gitconfig 特定于用户的设置。这就是选项集设置为`--global`存储。　　
 * $(prefix)/etc/gitconfig -系统范围的设置。

当选择在这些文件冲突,本地设置覆盖用户设置,覆盖整个系统的用户设置。如果你打开这些文件,你会看到类似下面的:

    [user]
    name = John Smith
    email = john@example.com
    [alias]
    st = status
    co = checkout
    br = branch
    up = rebase
    ci = commit
    [core]
    editor = vim

你可以手动编辑这些值，而效果跟使用`git config`一样。

### Example

你首先要做的在安装Git是告诉它你的名字/电子邮件和定制一些默认的设置。一个典型的初始配置可能类似于以下:

    # Tell Git who you are
    git config --global user.name "John Smith"
    git config --global user.email john@example.com

    # Select your favorite text editor
    git config --global core.editor vim

    # Add some SVN-like aliases
    git config --global alias.st status
    git config --global alias.co checkout
    git config --global alias.br branch
    git config --global alias.up rebase
    git config --global alias.ci commit

这将会生成一个`./gitconfig`的文件。


## git add

`git add`命令可以添加改变的文件到暂定的区域，在下次提交时它会告诉Git你想更新的是哪些特定的文件。然而，`git add`并没有对仓库有实际的改变，改变是没有实际记录的直到你使用`git commit`进行提交。

结合其他命令，你需要使用`git status`来预览工作目录和暂存区的状态。

### Usage

    git add <file>

暂存file文件中所有的改变，等待下次的提交。

    git add <directory>

暂存directory目录中的所有改变，等待下次的提交。

    git add -p

开始一个交互式会话让你选择部分文件等待下次的提交。这会向你展示一大块的改变和提示你输入的命令。使用`y`查看着块内容的状态，`n`忽略这块内容，`s`将它分为很小的块，`e`手动编辑这块内容，`q`退出。

### Discussion

`git add`和`git commit`命令组成了Git基本的工作流。这2个命令是所有Git使用者都需要明白的，不管他们的团队采用什么协作模式。他们意味着项目的版本会在仓库历史中有记录。

开发一个项目就是围绕着基本的`edit/stage/commit`的模式。首先，在你的工作目录中编辑你的文件。当你准备好保存你这个项目的当前状态时，你会使用`git add`进入下一步。最后，你很满意者阶段的快照，你可以使用`git commit`提交到仓库的项目历史中。

![commit 2][commit 2]

`git add`命令不应该与`svn add`提交文件到仓库的命令混淆。相反的，`git add`工作在更加抽象级别的改变。这就意味着你每次改变文件都需要使用`git add`，而`svn add`只需要使用一次。这听起来可能是多余的,但这个工作流使它更容易保持一个项目整洁。

### The Staging Area

Staging Area 是Git独有的特性，and it can take some time to wrap your head around it if you’re coming from an SVN (or even a Mercurial) background。你可以理解为是工作目录和项目历史之间的缓冲区。

Instead of committing all of the changes you've made since the last commit, the stage lets you group related changes into highly focused snapshots before actually committing it to the project history. This means you can make all sorts of edits to unrelated files, then go back and split them up into logical commits by adding related changes to the stage and commit them piece-by-piece. As in any revision control system, it’s important to create atomic commits so that it’s easy to track down bugs and revert changes with minimal impact on the rest of the project.

### Example

当你开始一个新的项目是，`git add`服务相同于`svn import`。在当前目录创建一个初始的提交，使用以下2个命令：

    git add .
    git commit

Once you’ve got your project up-and-running, new files can be added by passing the path to git add:

    git add hello.py
    git commit

以上的命令也可以用来记录更改现有的文件。再者, Git doesn’t differentiate between staging changes in new files vs. changes in files that have already been added to the repository.




## 参考资料
[gitTutorial][gitTutorial]

[gitTutorial]: https://www.atlassian.com/git


[basics]: https://www.atlassian.com/wac/landing/git/tutorial/git-basics/pageSections/0/contentColumnTwo/0/imageBinary/git-tutorial_basics.png
[git init]: https://www.atlassian.com/wac/landing/git/tutorial/git-basics/pageSections/00/contentFullWidth/0/tabs/0/pageSections/0/contentColumnTwo/0/imageBinary/git-tutorial-basics-init.png
[git clone]: https://www.atlassian.com/wac/landing/git/tutorial/git-basics/pageSections/00/contentFullWidth/0/tabs/0/pageSections/00/contentColumnTwo/0/imageBinary/git-tutorial-basics-clone.png
[git config]: https://www.atlassian.com/wac/landing/git/tutorial/git-basics/pageSections/00/contentFullWidth/0/tabs/0/pageSections/01/contentColumnTwo/0/imageBinary/git-tutorial-basics-config.png
[git add]: https://www.atlassian.com/wac/landing/git/tutorial/git-basics/pageSections/00/contentFullWidth/0/tabs/0/pageSections/02/contentColumnTwo/0/imageBinary/git-tutorial-basics-add.png
[git commit]: https://www.atlassian.com/wac/landing/git/tutorial/git-basics/pageSections/00/contentFullWidth/0/tabs/0/pageSections/03/contentColumnTwo/0/imageBinary/git-tutorial-basics-commit.png
[git status]: https://www.atlassian.com/wac/landing/git/tutorial/git-basics/pageSections/00/contentFullWidth/0/tabs/0/pageSections/05/contentColumnTwo/0/imageBinary/git-tutorial-basics-status.png
[git log]: https://www.atlassian.com/wac/landing/git/tutorial/git-basics/pageSections/00/contentFullWidth/0/tabs/0/pageSections/06/contentColumnTwo/0/imageBinary/git-tutorial-basics-log.png

[bare repo]: https://www.atlassian.com/wac/landing/git/tutorial/git-basics/pageSections/00/contentFullWidth/0/tabs/00/pageSections/01/contentFullWidth/00/imageBinary/git-tutorial-basics-init-barrepositories.png

[svn repo]: https://www.atlassian.com/wac/landing/git/tutorial/git-basics/pageSections/00/contentFullWidth/0/tabs/01/pageSections/01/contentFullWidth/00/imageBinary/git-tutorial-basics-clone-repotorepocollaboration.png

[git repo]: https://www.atlassian.com/wac/landing/git/tutorial/git-basics/pageSections/00/contentFullWidth/0/tabs/01/pageSections/01/contentFullWidth/00/imageBinary/git-tutorial-basics-clone-repotorepocollaboration.png

[commit 2]: https://www.atlassian.com/wac/landing/git/tutorial/git-basics/pageSections/00/contentFullWidth/0/tabs/03/pageSections/01/contentFullWidth/00/imageBinary/git-tutorial-basics-add-addsnapshot.png