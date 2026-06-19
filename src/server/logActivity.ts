import type { SupabaseClient } from '@supabase/supabase-js'

export async function logActivity(
  supabase: SupabaseClient,
  workspaceId: string,
  actorName: string,
  action: string,
  entityType: string,
  entityLabel: string,
) {
  await supabase.from('activity_log').insert({
    workspace_id: workspaceId,
    actor_name: actorName,
    action,
    entity_type: entityType,
    entity_label: entityLabel,
  })
}
