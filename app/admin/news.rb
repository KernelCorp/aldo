ActiveAdmin.register News do
  index do
    column :title
    column :slug
    column :created_at
    column :updated_at
    default_actions
  end

  form do |f|
    f.inputs do
      f.input :title
      f.input :preview
      f.input :body
      f.has_many :images, :allow_destroy => true do |cf|
        cf.input :path
      end
    end
    f.actions
  end

  show do
    render partial: "show", locals: { news_item: news }
  end
end