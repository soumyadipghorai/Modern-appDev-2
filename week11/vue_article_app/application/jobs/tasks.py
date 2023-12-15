from application.jobs.workers import celery
from datetime import datetime
from celery.schedules import crontab
from datetime import datetime 
from flask_sse import sse 
import time 

@celery.on_after_finalize.connect 
def setup_periodic_tasks(sender, **kwargs) :
    # instead of 10 sec you can set every 30 days 
    sender.add_pediodic_task(10.0, print_current_time_job.s(), name = "at every 10 seconds")

@celery.task()
def just_say_hello(name) :
    print("inside task")
    print("hello {}".format(name))
    return "hello {}".format(name)

@celery.task()
def long_running_job() :
    print("STARTED LONG JOB")
    now = datetime.now()
    dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
    sse.publish({"message": "STARTED ="+dt_string}, type = "greeting")
    for lp in range(100) :
        time.sleep(2)
        sse.publish({"message" : "SENDING EMAIL"}, type = "greeting")

    sse.publish({"message" : "COMPLETED EMAIL JOB"}, type = "greeting")

@celery.task()
def print_current_time_job() :
    print("start")
    now = datetime.now()
    print("now in task =", now)
    dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
    print("date and time = ", dt_string)
    print("complete")
    return dt_string