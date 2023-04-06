const getClassByPostStatus = (
  status: 'published' | 'drafted' | 'deleted'
): { class: string; label: string } => {
  const statusToText = {
    published: {
      label: 'Publicado',
      class: 'hidden',
    },
    drafted: {
      label: 'Borrador',
      class: 'text-yellow-600 bg-yellow-200 px-3 py-1 rounded-full',
    },
    deleted: {
      label: 'Eliminado',
      class: 'text-red-600 bg-red-200 px-3 py-1 rounded-full',
    },
  };

  return statusToText[status];
};

interface StatusBadgeProps {
  status: 'published' | 'drafted' | 'deleted';
  className?: string;
}

export function StatusBadge({
  status: postStatus,
  className = '',
}: StatusBadgeProps) {
  const status = getClassByPostStatus(postStatus);

  return (
    <p className={`mr-auto inline-block text-xs ${status.class} ${className}`}>
      {status.label}
    </p>
  );
}
