#! /bin/sh
echo "======================================================================"
echo "Welcome to to the setup. This will setup the local virtual env." 
echo "And then it will install all the required python libraries."
echo "You can rerun this without any issues."
echo "----------------------------------------------------------------------"
if [ "env" ];
then
    echo "Enabling virtual env"
else
    echo "No Virtual env in the directory. Please run setup.sh first"
    exit N
fi

# Activate virtual env
.env/Scripts/activate
export ENV=testing
# for the coverage in different files 
coverage pytest --verbose --disable-warnings -s
coverage report -m 
deactivate