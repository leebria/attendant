<p align="center">
  <img src="icons/title.png">
</p>

## A Laravel Valet GUI

<p align="center">
  <img src="shot.png">
</p>

## Requirements

You need to have valet entirely install already.

## Currently Supports

- Listing Sites
- Showing Valet Running status
- Restarting Valet
- Stoping Valet
- Starting Valet
- Link and Unlink Directories
- Park and Forget Directories
- Opening sites in browser
- Revealing sites in finder
- Opening sites in Sublime Text using the `subl` utility

## Installation

Download the most recent version from the ["Releases"](https://github.com/phppirate/attendant/releases) page and add it to your Applications folder.

Then run this is your terminal
```
ln -s /Applications/Attendant.app/Contents/Resources/app/attendant /usr/local/bin
```
Also make sure `/usr/local/bin` is in your $PATH env variable.

## Caveat

Now here is the only issue. When you want to open Attendant you need to open your terminal and type `attendant`.

That is it!
