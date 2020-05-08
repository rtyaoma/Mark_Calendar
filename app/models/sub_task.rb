class SubTask < ApplicationRecord
    
    belongs_to :task

    def user
        return User.find_by(id: self.user_id)
    end
    
end
