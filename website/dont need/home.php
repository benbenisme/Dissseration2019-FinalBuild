<!doctype html>
<html>

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">

    <!-- jQuery library -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

    <!-- Latest compiled JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>

    <!-- google icons -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

    <!-- google font -->
    <link href='https://fonts.googleapis.com/css?family=Finger Paint' rel='stylesheet'>

    <script src="./blockly/blockly_compressed.js"></script>
    <script src="./blockly/blocks_compressed.js"></script>
    <script src="./blockly/javascript_compressed.js"></script>
    <script src="./blockly/msg/js/en.js"></script>
    <script src="./NeilFraser-JS-Interpreter-208d182/acorn_interpreter.js"></script>

    <style>
        .levelSelection {
            height: 100vh;
            overflow: hidden;
            overflow-y: scroll;
            text-align: center;
        }

        .top-buffer {
            margin-top: 20px;
        }

        .fontHome {
            font-family: "Finger Paint", Times, serif;
        }

        .levelButton {}
        .checkMark {}
    </style>
</head>

<body>
    <main role="main" class="container-fluid">
        <div class="row">
            <div class="jumbotron jumbotron-fluid fontHome justify-content-center">
                <div class="container-fluid text-center">
                    <h1>Level Selection</h1>
                </div>
            </div>

        </div>
        <div class="row">
            <div class="col-sm-6 levelSelection">
                <div class="container-fluid">
                    <!-- LEVEL ONE ROW -->
                    <div class="row top-buffer">
                        <div class="col-sm-6">
                            <button class="btn btn-secondary fontHome levelButton" id="levelOneButton"
                                style="width: 100%">Level
                                One</button>
                        </div>
                        <div class="col-sm-2">
                            <img style="display:block; height: auto" src="./media/checkmark.svg" />
                        </div>
                    </div>
                    <!-- LEVEL TWO ROW -->
                    <div class="row top-buffer">
                        <div class="col-sm-6">
                            <button class="btn btn-secondary fontHome levelButton" id="levelTwoButton"
                                style="width: 100%">Level
                                Two</button>
                        </div>
                        <div class="col-sm-4">
                            <img style="display:block; height: auto" src="./media/checkmark.svg" />
                        </div>
                    </div>
                    <!-- LEVEL THREE ROW -->
                    <div class="row top-buffer">
                        <div class="col-sm-6">
                            <button class="btn btn-secondary fontHome levelButton" id="levelThreeButton"
                                style="width: 100%">Level
                                Three</button>
                        </div>
                        <div class="col-sm-4">
                            <img style="display:block; height: auto" src="./media/checkmark.svg" />
                        </div>
                    </div>
                    <!-- LEVEL FOUR ROW -->
                    <div class="row top-buffer">
                        <div class="col-sm-6">
                            <button class="btn btn-secondary fontHome levelButton" id="levelFourButton"
                                style="width: 100%">Level
                                Four</button>
                        </div>
                        <div class="col-sm-4">
                            <img style="display:block; height: auto" src="./media/checkmark.svg" />
                        </div>
                    </div>
                    <!-- LEVEL FIVE ROW -->
                    <div class="row top-buffer">
                        <div class="col-sm-6">
                            <button class="btn btn-secondary fontHome levelButton" id="levelFiveButton"
                                style="width: 100%">Level
                                Five</button>
                        </div>
                        <div class="col-sm-4">
                            <img style="display:block; height: auto" src="./media/checkmark.svg" />
                        </div>
                    </div>
                    <!-- LEVEL SIX ROW -->
                    <div class="row top-buffer">
                        <div class="col-sm-6">
                            <button class="btn btn-secondary fontHome levelButton" id="levelSixButton"
                                style="width: 100%">Level
                                Six</button>
                        </div>
                        <div class="col-sm-4">
                            <img style="display:block; height: auto" src="./media/checkmark.svg" />
                        </div>
                    </div>

                </div>
            </div>
            <div class="col-sm-6">
                <!-- for shelf and images -->
                <div class="container-fluid">
                    <div class="row">
                        <div id="levelDetailsArea"
                            style="display: inline-block; height: 480px; width: 100%; border: 1px solid black">
                            random example text
                        </div>
                    </div>
                    <div class="row fontHome text-center justify-content-center">
                        <div class="col-sm 8"></div>
                        <button class="btn btn-success" id="playButton" style="width: 100%">Play</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </main>
    <script>
        var pageNumer =<?php 
        // read each line of the password file to the $data array
        $data = file('./log.txt');
        $time = 0;

        // check each password in the file
        foreach($data as $line) {
	    $lineData = explode(',', $line);
            if($lineData[0] == $password) {
            $time = time() - $lineData[1];
            }
        }
        ?> 
    </script>
    <script src="home.js"></script>
</body>

</html>