Rails.application.routes.draw do
  namespace :api, { format: 'json' } do
    namespace :v1 do
        resources :events
        post 'events/index' => 'events#index'

    end
  end
  format 'json' do
    get 'events/index'
  end
  post 'select' => 'events#select'
  post 'logout' => 'users#logout'

  patch 'users/:id/update' => 'users#update'
  get 'users/:id/edit' => 'users#edit'
  post 'users/create' => 'users#create'
  get 'signup' => 'users#new'
  get 'users/index' => 'users#index'
  get 'users/:id' => 'users#show'

  post 'tasks/index' => 'tasks#index'
  get 'tasks/index'
  get 'tasks/new' => 'tasks#new'
  get 'tasks/:id' => 'tasks#show'
  post 'tasks/create' => 'tasks#create'
  get 'tasks/:id/edit' => 'tasks#edit'
  patch 'tasks/:id/update' => 'tasks#update'
  post 'tasks/:id/destroy' => 'tasks#destroy'

  patch 'calendars/:id/update' => 'calendars#update'
  get 'calendars/:id/edit' => 'calendars#edit'
  post 'calendars/create' => 'calendars#create'
  get 'calendars/index' => 'calendars#index'
  get 'calendars/new' => 'calendars#new'
  get 'calendars/:id' => 'calendars#show'

  post 'events/index' => 'events#index'
  get 'events/index' => 'events#index'
  get 'events/new' => 'events#new'
  get 'events/click' => 'events#click_new'
  get 'events/:id' => 'events#show'
  get 'events/click/:id' => 'events#click_show'
  get 'login' => 'users#login_form'
  post 'login' => 'users#login'
  post 'events/create' => 'events#create'
  get 'events/:id/edit' => 'events#edit'
  patch 'events/:id/update' => 'events#update'
  post 'events/:id/destroy' => 'events#destroy'
  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
