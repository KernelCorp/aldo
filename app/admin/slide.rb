ActiveAdmin.register Slide do
  index do
    column :title
    column :content
    column :href
    default_actions
  end

  form do |f|
    f.inputs do
      f.input :title
      f.input :content
      f.input :href
      f.input :background, as: :file
    end
    f.actions
  end

  show do
    render partial: 'show', locals: { slide: slide }
  end
end