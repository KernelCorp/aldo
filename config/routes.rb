Aldo::Application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  mount ActiveAdmin::Tinymce::Engine => '/', as: 'admin_editor'





  root to: 'main#index'

  get 'contacts', to: 'main#contacts'
  get 'about', to: 'main#about'
  get 'about/biography', to: 'main#about_biography'

  get 'salon', to: 'main#salon'
  get 'salon/masters', to: 'main#salon_masters'
  get 'salon/interior', to: 'main#salon_interior'

  get 'press', to: 'main#press'

  get 'art', to: 'main#art'

  resources :news, only: [:index, :show]
  get 'news/offset/:offset', to: 'news#index_line'
  
  resources :productions, only: [:index, :show]
  resources :services, only: [:index, :show]
end
