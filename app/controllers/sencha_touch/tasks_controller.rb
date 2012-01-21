class SenchaTouch::TasksController < ApplicationController

  layout 'sencha_touch'

  def index
    @tasks = Task.scoped#.order('done ASC, updated_at DESC')

    respond_to do |f|
      f.html
      f.json {render :json => @tasks}
    end
  end

  def create
    new_tasks = []
    params[:records].each do |task|
      new_task = Task.new(:body => task[:body])
      if !new_task.save
        render :status => 404, :text => 'not found'
        break
      end
      new_tasks << new_task
    end

    render :json => new_tasks
  end

  def edit
    @task = Task.find_by_id(params[:id])
  end

  def update
    @task = Task.find_by_id(params[:id])

    if @task.update_attributes(params[:records].first)
      render :json => [@task]
    else
      render :status => 404, :text => 'not found'
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
