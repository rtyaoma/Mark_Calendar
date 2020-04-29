class Task < ApplicationRecord
    has_many :sub_tasks
    accepts_nested_attributes_for :sub_tasks, allow_destroy: true
    validates :user_id, {presence: true}
    def user
        return User.find_by(id: self.user_id)
    end
    


end
