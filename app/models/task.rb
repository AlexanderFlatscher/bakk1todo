class Task < ActiveRecord::Base

  def done!
    self.done = true
    self.save
  end

  def undone!
    self.done = false
    self.save
  end
  
end
