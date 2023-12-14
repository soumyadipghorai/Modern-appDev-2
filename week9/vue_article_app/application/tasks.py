from application.workers import celery
from datetime import datetime
from celery.schedules import crontab

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
def print_current_time_job() :
    print("start")
    now = datetime.now()
    print("now in task =", now)
    dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
    print("date and time = ", dt_string)
    print("complete")
    return dt_string