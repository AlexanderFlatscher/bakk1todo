class JqueryMobile::TasksController < ApplicationController

  layout 'jquery_mobile'

  def index
    @tasks = Task.order('done ASC, updated_at DESC')

    if params[:state] == 'done'
      @tasks = @tasks.where(:done => true)
    elsif params[:state] == 'undone'
      @tasks = @tasks.where(:done => false)
    end
  end

  def new
    @task = Task.new
  end

  def create
    @task = Task.new(params[:task])

    if @task.save
      redirect_to jquery_mobile_tasks_path
    else
      render new
    end
  end

  def edit
    @task = Task.find_by_id(params[:id])
  end

  def update
    @task = Task.find_by_id(params[:id])

    if @task.update_attributes(params[:task])
      redirect_to jquery_mobile_tasks_path
    else
      render edit
    end
  end

  def destroy
    if Task.find_by_id(params[:id]).destroy
      render :status => 200, :text => 'OK'
    else
      render :status => 404, :text => 'not found'
    end
  end

  def complete
    if Task.find_by_id(params[:task_id]).done!
      render :status => 200, :text => 'OK'
    else
      render :status => 404, :text => 'not found'
    end
  end

  def incomplete
    if Task.find_by_id(params[:task_id]).undone!
      render :status => 200, :text => 'OK'
    else
      render :status => 404, :text => 'not found'
    end
  end

end
