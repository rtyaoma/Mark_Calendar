class Task < ApplicationRecord
    validates :user_id,{presence: true}
    validates :title,{presence: true}
    
    has_many :sub_tasks, dependent: :destroy
    accepts_nested_attributes_for :sub_tasks, reject_if: :reject_sub_tasks, allow_destroy: true

    def user
        return User.find_by(id: self.user_id)
    end

    def reject_sub_tasks(attributes)
        exists = attributes[:id].present?
        empty = attributes[:title].blank?
        attributes.merge!(_destroy: 1) if exists && empty
        !exists && empty
      end

    


end
