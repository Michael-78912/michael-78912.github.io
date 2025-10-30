<!-- 
    Hi guys!

    This is the editable blog file. It's in Markdown, which means you can essentially use plain text and it'll work fine. 
    It does provide some some nice formatting options but I'll get into that later.

-----------------------------------------------------------------------------------------------------------------------------

    To work with this: First ensure you have a github account and are added to the website's repo.
    Next, open your shell. Ensure you have git installed.

    1) 
        ONE TIME ONLY: Clone the repo `git clone https://github.com/Michael-78912/michael-78912.github.io`

        AFTER FIRST TIME: 
            'cd (repository folder)`
            `git pull` 

        Pulling the repository everytime is not strictly necessary if no one has updated the repository since you have,
        but it is recommended.

        If you try to clone it twice it will duplicate the repo inside of the existing one. Not good! 

    2) Make your changes to this file (data/blog.md) Ensure the format is followed! Or the website will break lol

    3) in your shell, type `git add blog/blog.md`. This will stage your updates for commit.

    4) type `git commit -m "Blog post XXXX"`. Include date and whatever else you want to say. This will stage your updates for push.

    5) type `git push`. This will push your committed changes to the web. It will take the website 2-5 minutes to update. Ctrl+Shift+R
        will force refresh the website and may make it load faster.

-------------------------------------------------------------------------------------------------------------------------------

    BLOG.MD

    This is the editable source file! DON'T FUCK WITH BLOG.HTML OR YOU'RE FIRED. Blog posts are separated by the <POST> tag.
    To make a new post, create some new lines at THE TOP of the file (under this comment but above all other posts). 
    Using a code editor will help you but isn't entirely necessary. I tried to make this as easy as I could to edit.

    The <POST> tag follows the following format:

    <POST DATE="YYYY-MM-DD" AUTHOR="Name" TITLE="Header/post title" LOCATION="City/wherever"> MARKDOWN CONTENT </POST>

    LOCATION is optional. The end tag is very important, as it shows the parser where the post ends and the previous one
    begins. If you don't include </POST> the parser will include the previous post in your current one, and it'll look fucked up.

    BRIEF MARKDOWN OVERVIEW

    Markdown is just a high-level implementation of HTML. Chances are you've used it before; platforms like Gmail, Reddit, and Discord
    all support at least some level of it. It's designed to be both easy to convert to HTML and human-readable at the same time.
    Here are some quick rules:

    - **BOLD**
    - __italic__
    - [Link Title](https://example.com/)
    - `code`
    - Blockquote: > "This is a quote by Michael, Michaewl is super epci"
    - Horizontal Rule: --- (on its own line)
    - Image: ![Alt Text](https://link-to-image.com/image.jpg)
    - Superscript: X^2^ = 4
    - Subscript: N~x~ = 4
    - Emoji: :joy:


    - # HEADER
        # H1 (Largest)
        ## H2 (Big)
        ### H3 (medium)
        #### H4 (About the same as normal text)
        ##### H5 (Smaller than normal text)
        ###### H6 (About the same size as sub/superscript)

    - Ordered List:
        1. blah,
        2. blah,
        3. blah, etc.. [1), 2), etc. also works]

    - Unordered List:
        - Item1
        * Item2
        + Item3 (-, +, and & all work, but make it consistent or it'll be ugly)

    
    - Markdown also supports some base HTML tags. The only really important ones are:
        - <br /> - Line break
        - <!-- Comment - You can write anything in this tag and it will not render. Just don't forget to close! -->


-->

<POST DATE=2025-10-30 AUTHOR="Michael" TITLE="CYANIDE" LOCATION="Kelowna">
Hello friends! Tonight, at I think around 9pm (so effectively on Halloween) CYANIDE comes out.
This is one of our more emotional songs! But don't worry, it still has a lot of fast energy and screaming.
We pushed Logan to his limits and  came out with a really unique vocal tone. We hope you guys enjoy!
It will be out on all platforms tonight!
</POST>

<POST DATE="2025-10-28" AUTHOR="Michael" TITLE="Blog Sample" LOCATION="Kelowna">
Yesterday we worked on a couple songs! Today I'm sitting in my room, sick, trying to figure out this website
and make the blog posts ncie and easy for other peopel to write! I also did the **photo gallery**


</POST>
