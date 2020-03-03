Rails.application.routes.draw do
  namespace :api, { format: 'json' } do
    namespace :v1 do
        resources :events
    end
  end
  get 'events/index'
  get 'events/show'
  get 'events/new' => 'events#new'
  post 'events/create' => 'events#create'
  get 'events/edit'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
